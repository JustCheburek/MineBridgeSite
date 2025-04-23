"use server"

import type {User} from "lucia";
import {notFound} from "next/navigation";
import {unstable_cache as cache} from "next/cache";
import {caseModel, codeModel, dropModel, seasonModel, sqlPool, userModel} from "@server/models";
import {Season} from "@/types/season";
import type {GuildDSUser} from "@/types/user";
import axios from "axios";
import type {Role} from "@/types/role";
import {Case, Drop, Item, RarityType} from "@/types/case";
import {idOrName, idOrNameUser} from "@/types/idOrName";
import {AUTO, NO_ROLES, ROLES, ROLES_START} from "@/const";
import {Code} from "@/types/code";
import {InviteEmail} from "@email/invite";
import {From} from "@/types/invite";
import {Resend} from "resend";
import mysql from "mysql2/promise";

// todo: Разделение на папки

const resend = new Resend(process.env.RESEND_API_KEY);

interface isRoles {
    isHelper: boolean
    isModer: boolean
    isAdmin: boolean
    isContentMaker: boolean
}

export interface RolesApi extends isRoles {
    roles: Role[]
}

const getRoles = cache(
    async (discordId?: string): Promise<RolesApi> => {
        if (!discordId) {
            return {roles: [], ...NO_ROLES}
        }

        const allRoles = await axios.get<Role[]>(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/roles`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).then(r => r.data);

        const dsUser = await axios.get<GuildDSUser>(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).then(r => r.data).catch(console.error);

        const roles = allRoles.filter(({id}) => dsUser?.roles?.includes(id))
        const isDonate = roles?.some(({name}) => name.toLowerCase().includes(ROLES.donate))

        // Привилегии
        let isAdmin = false, isModer = false, isHelper = false
        if (!isDonate) {
            isAdmin = roles?.some(({name}) => name.toLowerCase().includes(ROLES.admin))
            isModer = isAdmin || roles?.some(({name}) => name.toLowerCase().includes(ROLES.moder))
            isHelper = isModer || roles?.some(({name}) => name.toLowerCase().includes(ROLES.helper))
        }

        const isContentMaker = roles?.some(({name}) => name.toLowerCase().includes(ROLES.content))

        return {roles, isHelper, isModer, isAdmin, isContentMaker}
    },
    ["roles", "userLike", "all"],
    {revalidate: 300, tags: ["roles", "userLike", "all"]}
)

type GetUser = {
    throwNotFound?: boolean
    roles?: boolean
    authorId?: User["_id"]
    show?: boolean
} & idOrNameUser
export const getUser = cache(
    async (
        {
            name,
            _id,
            throwNotFound = true,
            roles = false,
            authorId,
            show = false
        }: GetUser
    ) => {
        let userM

        if (name) {
            userM = await userModel.findOne({name}, {}, {lean: true})
        } else {
            userM = await userModel.findById(_id, {}, {lean: true})
        }

        const user: User | null = JSON.parse(JSON.stringify(userM))

        if (!user) {
            if (throwNotFound) {
                console.error(`User не найден: ${name ?? _id}`)
                notFound()
            }

            throw new Error(`User не найден: ${name ?? _id}`)
        }

        const isMe = authorId ? (authorId.toString() === user._id.toString()) : false

        if (!show && !isMe) {
            user.email = "×".repeat(user.email.length - 4) + user.email.substring(user.email.length - 4)

            const googleId = user.googleId?.toString()
            const discordId = user.discordId?.toString()
            if (googleId) {
                user.googleId = "×".repeat(googleId.length - 4) + googleId.substring(googleId.length - 4)
            }
            if (discordId) {
                user.discordId = "×".repeat(discordId.length - 4) + discordId.substring(discordId.length - 4)
            }
        }

        if (roles && user?.discordId) {
            const rolesApi = await getRoles(user.discordId)
            return {
                user,
                isMe, ...rolesApi,
                isContentMakerCheck: (isMe || rolesApi.isHelper) && rolesApi.isContentMaker
            }
        }

        return {
            user,
            isMe,
            ...NO_ROLES,
            isContentMakerCheck: false,
            roles: []
        }
    },
    ["user", "userLike", "all"],
    {revalidate: 600, tags: ["user", "userLike", "all"]}
)

export const getAuthor = cache(
    async (id?: string): Promise<{ user: User | null } & RolesApi> => {
        const user: User | null = JSON.parse(JSON.stringify(await userModel.findByIdAndUpdate(
            id,
            {onlineAt: new Date()},
            {lean: true},
        )))

        return {user, ...await getRoles(user?.discordId)}
    },
    ["author", "userLike", "all"],
    {revalidate: 300, tags: ["author", "userLike", "all"]}
)

type getUsers = {
    page?: number
    perPage?: number
}
export const getUsers = cache(
    async ({page = 0, perPage = 0}: getUsers = {}) => {
        const users: User[] = JSON.parse(JSON.stringify(
            await userModel
                .find(
                    {},
                    {
                        name: 1, photo: 1, mostiki: 1, rating: 1, createdAt: 1, onlineAt: 1, invites: 1, from: 1
                    },
                    {
                        lean: true,
                        sort: {createdAt: -1},
                        skip: perPage * page,
                        limit: perPage
                    }
                )
        ))

        return users
    },
    ["users", "userLike", "all"],
    {revalidate: 1200, tags: ["users", "userLike", "all"]}
)

export const getUsersL = cache(
    async () => {
        return userModel.countDocuments({}, {lean: true})
    },
    ["users", "userLike", "all"],
    {revalidate: 3600, tags: ["users", "userLike", "all"]}
)

export const updateFrom = cache(
    async (user: User, from: { place: string, name: string }, authorRoles: Role[]): Promise<From> => {
        const rolePlace = authorRoles.find(({name}) => name.startsWith(ROLES_START.place))
        const roleName = authorRoles.find(({name}) => name.startsWith(ROLES_START.name))
        const rPlace = rolePlace?.name.substring(ROLES_START.place.length)
        const rName = roleName?.name.substring(ROLES_START.name.length)

        async function updateInviter(inviter: User, isContentMaker: boolean) {
            const mostiki = isContentMaker ? 10 : 0

            await userModel.findByIdAndUpdate(
                inviter._id,
                {
                    $push: {
                        invites: user._id,
                        punishments: {
                            reason: `Позвал ${user.name}`,
                            rating: 5,
                            author: AUTO.MOD
                        }
                    },
                    $inc: {
                        rating: 5,
                        mostiki
                    }
                }
            )

            if (inviter.notifications.invite) {
                await resend.emails.send({
                    from: 'Майнбридж <invite@m-br.ru>',
                    to: inviter.email,
                    subject: `Приглашение ${user.name} на MineBridge`,
                    react: InviteEmail({name: user.name, from, isContentMaker})
                })
            }
        }

        if (rPlace) {
            let userInfo
            if (rName) {
                userInfo = await getUser({
                    name: rName, throwNotFound: false
                }).catch(console.error)
            }
            const inviter = userInfo?.user

            if (!user.from?.userId && inviter && !inviter.invites.some(id => String(id) === String(user._id))) {
                await updateInviter(inviter, true)
            }

            return {place: rPlace, userId: inviter?._id}
        }

        const nullFrom = {place: undefined, userId: undefined}
        if (!from) return nullFrom

        const {place, name} = from
        if (!place || user.name === name) {
            return nullFrom
        }

        const userInfo = await getUser({name, throwNotFound: false}).catch(console.error)
        const inviter = userInfo?.user
        const isContentMaker = userInfo?.isContentMakerCheck || false
        if (!user.from?.userId && inviter && !inviter.invites.some(id => String(id) === String(user._id))) {
            await updateInviter(inviter, isContentMaker)
        }

        return {place, userId: inviter?._id}
    },
    ["from"],
    {revalidate: 3600, tags: ["from"]}
)

export const getCaseLocal = cache(
    async (
        param: idOrName,
        Cases: Case[]
    ) => {
        const Case = Cases.find(({name, _id}) =>
            name === param.name || String(_id) === String(param._id)
        )

        if (!Case) {
            console.error(`Case не найден: ${JSON.stringify(param)}`)
        }

        return Case
    },
    ["case", "shop", "all"],
    {revalidate: 3600, tags: ["case", "shop", "all"]}
)

export const getCase = cache(
    async (
        param: idOrName
    ) => {
        const Case: Case | null = JSON.parse(JSON.stringify(
            await caseModel.findOne(
                param,
                {},
                {
                    lean: true
                })
        ))

        if (!Case) {
            throw new Error(`Case не найден: ${JSON.stringify(param)}`)
        }

        return Case
    },
    ["case", "shop", "all"],
    {revalidate: 3600, tags: ["case", "shop", "all"]}
)

export const getCases = cache(
    async (): Promise<Case[]> => JSON.parse(JSON.stringify(
        await caseModel.find(
            {},
            {},
            {
                lean: true
            })
    )),
    ["cases", "shop", "all"],
    {revalidate: 3600, tags: ["cases", "shop", "all"]}
)

export const getDropLocal = cache(
    async (
        param: idOrName,
        Drops: Drop[]
    ) => {
        const Drop = Drops.find(({name, _id}) =>
            name === param.name || String(_id) === String(param._id)
        )

        if (!Drop) {
            console.error(`Drop не найден: ${JSON.stringify(param)}`)
        }

        return Drop
    },
    ["drop", "shop", "all"],
    {revalidate: 3600, tags: ["drop", "shop", "all"]}
)

export const getDrop = cache(
    async (
        param: idOrName
    ) => {
        const Drop: Drop | null = JSON.parse(JSON.stringify(
            await dropModel.findOne(
                param,
                {},
                {
                    lean: true
                }
            )
        ))

        if (!Drop) {
            throw new Error(`Drop не найден: ${JSON.stringify(param)}`)
        }

        return Drop
    },
    ["drop", "shop", "all"],
    {revalidate: 3600, tags: ["drop", "shop", "all"]}
)

export const getDrops = cache(
    async () => {
        const drops: Drop[] = JSON.parse(JSON.stringify(
            await dropModel.find(
                {},
                {},
                {
                    lean: true,
                    sort: {price: -1}
                }
            )
        ))

        return drops
    },
    ["drops", "shop", "all"],
    {revalidate: 3600, tags: ["drops", "shop", "all"]}
)

export const getItems = cache(
    async (
        rarity: RarityType,
        DropItem?: Drop
    ) => {
        if (!DropItem) return []
        let Items = DropItem?.drop
        if (Items?.length === 0) {
            Items = DropItem[rarity]
        }

        if (Items?.length === 0 || !Items) {
            console.error(`Items не найден`)
        }

        return Items || []
    },
    ["items", "shop", "all"],
    {revalidate: 3600, tags: ["items", "shop", "all"]}
)

export const getItem = cache(
    async (
        param: idOrName,
        Items: Item[]
    ) => {
        if (Items.length === 0) {
            return Items[0]
        }

        const Item = Items.find(({_id, name}) =>
            String(_id) === String(param._id) ||
            name === param.name
        )

        if (!Item) {
            console.error(`Item не найден: ${JSON.stringify(param)}`)
        }

        return Item
    },
    ["item", "shop", "all"],
    {revalidate: 3600, tags: ["item", "shop", "all"]}
)

export const getSeasons = cache(
    async () => {
        const seasons: Season[] = JSON.parse(JSON.stringify(
            await seasonModel.find(
                {},
                {},
                {lean: true, sort: {number: -1}}
            )
        ))

        seasons.map(season => {
            season.news.sort(({createdAt: createdAt1}, {createdAt: createdAt2}) =>
                new Date(createdAt2 || "").getTime() - new Date(createdAt1 || "").getTime()
            )
            season.events.sort(({startAt: startAt1}, {startAt: startAt2}) =>
                new Date(startAt2 || "").getTime() - new Date(startAt1 || "").getTime()
            )
            return season
        })

        return seasons
    },
    ["seasons", "news", "events", "all"],
    {revalidate: 1800, tags: ["seasons", "news", "events", "all"]}
)

export const getCodes = cache(
    async () => JSON.parse(JSON.stringify(
        await codeModel.find(
            {},
            {},
            {lean: true}
        )
    )),
    ["codes", "shop", "all"],
    {revalidate: 3600, tags: ["codes", "shop", "all"]}
)

export const getCode = cache(
    async (
        _id: Code["_id"]
    ) => {
        const code: Code | null = JSON.parse(JSON.stringify(
            await codeModel.findById(
                _id,
                {},
                {lean: true}
            )
        ))

        if (!code) {
            console.error(`Code не найден: ${String(_id)}`)
            notFound()
        }

        return code
    },
    ["code", "shop", "all"],
    {revalidate: 1200, tags: ["code", "shop", "all"]}
)

export const getLastSeen = cache(
    async (name: string) => {
        try {
            const [rows] = await sqlPool.execute<mysql.RowDataPacket[]>(
                "SELECT last_seen FROM librepremium_data WHERE last_nickname = ? LIMIT 1",
                [name]
            );

            return new Date(rows[0]?.last_seen) ?? null;
        } catch (e) {
            console.error(e)
        }
    }
);
