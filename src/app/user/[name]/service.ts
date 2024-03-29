"use server"

import {userModel} from "@server/models";
import {Rcon} from "@server/console";
import type {User} from "lucia";

type State = {
	message: string, user: User, isMe: boolean, success: boolean, error: boolean
}

export async function NameChange(prevState: State, formData: FormData) {
	"use server"

	const {user, isMe} = prevState
	const name = formData.get("name")?.toString()

	if (!isMe || !name || name === user.name) return {
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

	const {user, isMe} = prevState
	const photo = formData.get("photo")?.toString()

	console.log(prevState, photo)

	if (!isMe || !photo || photo === user.photo) return {
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

	const {user, isMe} = prevState

	if (!isMe) return {
		...prevState,
		error: true,
		message: "Это не ты!"
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