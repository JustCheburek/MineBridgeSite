"use server"
import type {User} from "lucia";
import {notFound} from "next/navigation";
import {unstable_cache as cache} from "next/cache";
import {caseModel, dropModel, seasonModel, userModel} from "@server/models";
import {Season} from "@/types/season";

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

			return {user, isMe, ...await userModel.getRoles(user.discordId)}
		},
		["user", "userLike", "all"],
		{revalidate: 300, tags: ["user", "userLike", "all"]}
)

export const getAuthor = cache(
		async (id?: string) => {
			const user: User | null = await userModel.findById(id).lean()

			return {user, ...await userModel.getRoles(user?.discordId)}
		},
		["author", "userLike", "all"],
		{revalidate: 300, tags: ["author", "userLike", "all"]}
)

export const getUsers = cache(
		async () => await userModel.find().lean() as User[],
		["users", "userLike", "all"],
		{revalidate: 300, tags: ["users", "userLike", "all"]}
)

export const getCases = cache(
		async () => await caseModel.find().lean(),
		["cases", "shop", "all"],
		{tags: ["cases", "shop", "all"]}
)

export const getDrops = cache(
		async () => await dropModel.find().lean(),
		["drops", "shop", "all"],
		{tags: ["drops", "shop", "all"]}
)

export const getSeasons = cache(
		async () => await seasonModel.find().lean() as Season[],
		["seasons", "news", "events", "all"],
		{revalidate: 400, tags: ["seasons", "news", "events", "all"]}
)