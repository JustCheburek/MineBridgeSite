"use server"
import type {User} from "lucia";
import {notFound} from "next/navigation";
import {unstable_cache} from "next/cache";
import {caseModel, dropModel, seasonModel, userModel} from "@server/models";
import {Season} from "@/types/season";

export const getUser = unstable_cache(
		async (
				param: {
					_id?: User["_id"],
					name?: User["name"]
				}
		) => {
			const user: User | null = await userModel.findOne(param).lean()

			if (!user) notFound()

			user._id = user._id.toString()

			return {user, ...await userModel.getRoles(user.discordId)}
		},
		["user", "userLike", "all"],
		{revalidate: 300, tags: ["user", "userLike", "all"]}
)

export const getAuthor = unstable_cache(
		async (id?: string) => {
			const user: User | null = await userModel.findById(id).lean()

			return {user, ...await userModel.getRoles(user?.discordId)}
		},
		["author", "userLike", "all"],
		{revalidate: 300, tags: ["author", "userLike", "all"]}
)

export const getUsers = unstable_cache(
		async () => await userModel.find().lean() as User[],
		["users", "userLike", "all"],
		{revalidate: 300, tags: ["users", "userLike", "all"]}
)

export const getCases = unstable_cache(
		async () => await caseModel.find().lean(),
		["cases", "shop", "all"],
		{tags: ["cases", "shop", "all"]}
)

export const getDrops = unstable_cache(
		async () => await dropModel.find().lean(),
		["drops", "shop", "all"],
		{tags: ["drops", "shop", "all"]}
)

export const getSeasons = unstable_cache(
		async () => await seasonModel.find().lean() as Season[],
		["seasons", "news", "events", "all"],
		{revalidate: 400, tags: ["seasons", "news", "events", "all"]}
)