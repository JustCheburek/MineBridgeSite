"use server"

import type {User} from "lucia";
import {notFound} from "next/navigation";
import {unstable_cache as cache} from "next/cache";
import {caseModel, dropModel, seasonModel, userModel} from "@server/models";
import {Season} from "@/types/season";
import type {GuildDSUser} from "@/types/user";
import axios from "axios";
import type {Role} from "@/types/role";
import {Case, Drop} from "@/types/case";

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
				param: {
					_id?: User["_id"],
					name?: User["name"]
				},
				_id?: User["_id"],
				show: boolean = false
		) => {
			const user: User | null = await userModel.findOne(param).lean()

			if (!user) notFound()

			user._id = user._id.toString()
			const isMe = _id === user._id

			const roles = await getRoles(user?.discordId)

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

			return {user, isMe, ...roles, isContentMaker: (isMe || roles.isModer) && roles.isContentMaker}
		},
		["user", "userLike", "all"],
		{revalidate: 300, tags: ["user", "userLike", "all"]}
)

export const getAuthor = cache(
		async (id?: string): Promise<{user: User | null} & RolesApi> => {
			const user: User | null = await userModel.findByIdAndUpdate(
					id,
					{onlineAt: new Date()}
			).lean()

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
		{revalidate: 300, tags: ["users", "userLike", "all"]}
)

export const getCases = cache(
		async () => await caseModel.find().lean() as Case[],
		["cases", "shop", "all"],
		{tags: ["cases", "shop", "all"]}
)

export const getDrops = cache(
		async () => await dropModel.find().lean() as Drop[],
		["drops", "shop", "all"],
		{tags: ["drops", "shop", "all"]}
)

export const getSeasons = cache(
		async () => {
			const seasons = await seasonModel.find().lean() as Season[]

			seasons.sort(({number: number1}, {number: number2}) =>
					number2 - number1
			)

			return seasons
		},
		["seasons", "news", "events", "all"],
		{revalidate: 400, tags: ["seasons", "news", "events", "all"]}
)