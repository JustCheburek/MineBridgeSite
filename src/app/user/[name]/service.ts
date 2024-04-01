"use server"

import {userModel} from "@server/models";
import {Rcon} from "@server/console";
import type {User} from "lucia";

type State = {
	message: string, user: User, access: boolean, success: boolean, error: boolean
}

export async function NameChange(prevState: State, formData: FormData) {
	"use server"

	const {user, access} = prevState
	const name = formData.get("name")?.toString()

	if (!access || !name || name === user.name) return {
		...prevState,
		error: true,
		message: "Произошла ошибка, проверь ник!"
	}

	await userModel.findByIdAndUpdate(user._id, {name})

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}

export async function PhotoChange(prevState: State, formData: FormData) {
	"use server"

	const {user, access} = prevState
	const photo = formData.get("photo")?.toString()

	console.log(prevState, photo)

	if (!access || !photo || photo === user.photo) return {
		...prevState,
		error: true,
		message: "Произошла ошибка, проверь ссылку!"
	}

	await userModel.findByIdAndUpdate(user._id, {photo})

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}

export async function WhitelistFunc(prevState: State) {
	"use server"

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

	return {
		...prevState,
		error: false,
		success: true,
		message: "Успешно"
	}
}