"use server"

import {userModel} from "@server/models";
import {Rcon} from "@server/console";
import type {User} from "lucia";
import {revalidateTag} from "next/cache";

export interface State {
	user: User
	message: string
	access: boolean
	success: boolean
	error: boolean
}

export async function WhitelistFunc(prevState: State) {
	const {user, access} = prevState

	if (!access) return {
		...prevState,
		error: true,
		message: "Нет доступа!"
	}

	const client = await Rcon()
	console.log(`Добавляю в Whitelist: ${user.name}`)
	await client.run(`whitelist add ${user.name}`)

	await userModel.findByIdAndUpdate(user._id, {whitelist: true})

	revalidateTag("userLike")

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}

export async function MostikiChange(prevState: State, formData: FormData) {
	const {user, access} = prevState
	const mostiki = Number(formData.get("mostiki"))

	if (!access || !mostiki || mostiki === 0) return {
		...prevState,
		error: true,
		message: "Произошла ошибка, проверь мостики!"
	}

	await userModel.findByIdAndUpdate(
			user._id,
			{
				$inc: {mostiki}
			}
	)

	revalidateTag("userLike")

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}

export async function RatingChange(prevState: State, formData: FormData) {
	const {user, access} = prevState
	const reason = formData.get("reason")
	const rating = Number(formData.get("rating"))
	const author = formData.get("author")

	if (!access || !reason || !rating || !author || rating === 0) return {
		...prevState,
		error: true,
		message: "Произошла ошибка, проверь поля!"
	}

	await userModel.findByIdAndUpdate(
			user._id,
			{
				$push: {
					punishments: {
						reason,
						rating,
						author
					}
				}
			}
	)

	revalidateTag("userLike")

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}

export async function UserDelete(prevState: State, formData: FormData) {
	const {user, access} = prevState
	const name = formData.get("name")

	if (!access || !name) return {
		...prevState,
		error: true,
		message: "Произошла ошибка, проверь поля!"
	}

	if (name !== user.name) return {
		...prevState,
		error: true,
		message: "Ник не совпадает!"
	}

	await userModel.findByIdAndDelete(user._id)

	revalidateTag("userLike")

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}