"use server"

import type {User} from "lucia";
import {notFound} from "next/navigation";
import {unstable_cache as cache} from "next/cache";
import {caseModel, dropModel, seasonModel, userModel} from "@server/models";
import {Season} from "@/types/season";
import type {GuildDSUser} from "@/types/user";
import axios from "axios";
import type {Role} from "@/types/role";
import {Case, Drop, RarityType} from "@/types/case";
import {idOrName} from "@/types/idOrName";

export interface isRoles {
    isModer: boolean
    isAdmin: boolean
    isContentMaker: boolean
}

export interface RolesApi extends isRoles {
    roles: Role[]
}

export const getRoles = cache(
    async (discordId?: string): Promise<RolesApi> => {
        if (!discordId) {
            return {roles: [], isAdmin: false, isModer: false, isContentMaker: false}
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
        const isAdmin = roles?.some(({name}) => name.toLowerCase().includes("админ"))
        const isModer = isAdmin || roles?.some(({name}) => name.toLowerCase().includes("модер"))
        const isContentMaker = roles?.some(({name}) => name.toLowerCase().includes("контент"))

        return {roles, isModer, isAdmin, isContentMaker}
    },
    ["roles", "userLike", "all"],
    {revalidate: 300, tags: ["roles", "userLike", "all"]}
)

export const getUser = cache(
    async (
        param: idOrName,
        throwNotFound: boolean = true,
        roles: boolean = false,
        _id?: User["_id"],
        show: boolean = false
    ) => {
        let user
        if (param?.name) {
            user = await userModel.findOne(param).lean() as User | null
        } else {
            user = await userModel.findById(param._id).lean() as User | null
        }

        if (!user) {
            if (throwNotFound) {
                console.error("User не найден: ", JSON.stringify(param))
                notFound()
            }

            throw new Error(`User не найден: ${JSON.stringify(param)}`)
        }

        user._id = user._id.toString()
        const isMe = _id === user._id

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
            return {user, isMe, ...rolesApi, isContentMakerCheck: (isMe || rolesApi.isModer) && rolesApi.isContentMaker}
        }

        return {
            user,
            isMe,
            isAdmin: false,
            isModer: false,
            isContentMaker: false,
            isContentMakerCheck: false,
            roles: []
        }
    },
    ["user", "userLike", "all"],
    {revalidate: 600, tags: ["user", "userLike", "all"]}
)

export const getAuthor = cache(
    async (id?: string): Promise<{ user: User | null } & RolesApi> => {
        const user = await userModel.findByIdAndUpdate(
            id,
            {onlineAt: new Date()}
        ).lean() as User | null

        return {user, ...await getRoles(user?.discordId)}
    },
    ["author", "userLike", "all"],
    {revalidate: 300, tags: ["author", "userLike", "all"]}
)

export const getUsers = cache(
    async () => {
        const users = await userModel.find().lean() as User[]

        users.sort(({createdAt: createdAt1}, {createdAt: createdAt2}) => {
            if (!createdAt1) return 1
            if (!createdAt2) return -1

            return new Date(createdAt2).getTime() - new Date(createdAt1).getTime()
        })

        return users
    },
    ["users", "userLike", "all"],
    {revalidate: 1200, tags: ["users", "userLike", "all"]}
)

export const getCaseLocal = cache(
    async (
        param: idOrName,
        Cases: Case[]
    ) => {
        const Case = Cases.find(({name, _id}) =>
            name === param.name || _id === param._id
        )

        if (!Case) {
            throw new Error(`Case не найден: ${JSON.stringify(param)}`)
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
        const Case = await caseModel.findOne(param).lean() as Case | null

        if (!Case) {
            throw new Error(`Case не найден: ${JSON.stringify(param)}`)
        }

        return Case
    },
    ["case", "shop", "all"],
    {revalidate: 3600, tags: ["case", "shop", "all"]}
)

export const getCases = cache(
    async () => await caseModel.find().lean() as Case[],
    ["cases", "shop", "all"],
    {revalidate: 3600, tags: ["cases", "shop", "all"]}
)

export const getDropLocal = cache(
    async (
        param: idOrName,
        Drops: Drop[]
    ) => {
        const Drop = Drops.find(({name, _id}) =>
            name === param.name || _id === param._id
        )

        if (!Drop) {
            throw new Error(`Drop не найден: ${JSON.stringify(param)}`)
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
        const Drop = await dropModel.findOne(param).lean() as Drop | null

        if (!Drop) {
            throw new Error(`Drop не найден: ${JSON.stringify(param)}`)
        }

        return Drop
    },
    ["drop", "shop", "all"],
    {revalidate: 3600, tags: ["drop", "shop", "all"]}
)

export const getDrops = cache(
    async () => await dropModel.find().lean() as Drop[],
    ["drops", "shop", "all"],
    {revalidate: 3600, tags: ["drops", "shop", "all"]}
)

export const getItems = cache(
    async (
        DropItem: Drop,
        rarity: RarityType
    ) => {
        // Items
        let {drop: items} = DropItem
        if (items?.length === 0) {
            items = DropItem[rarity]
        }

        if (items?.length === 0 || !items) {
            throw new Error(`Items не найден`)
        }

        return items
    },
    ["items", "shop", "all"],
    {revalidate: 3600, tags: ["items", "shop", "all"]}
)

export const getSeasons = cache(
    async () => {
        const seasons: Season[] = await seasonModel.find().lean()

        seasons.sort(({number: number1}, {number: number2}) =>
            number2 - number1
        )

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