import {api} from "@server/axios";
import type {User} from "lucia";
import {notFound} from "next/navigation";
import {Case, Drop} from "@src/types/case";
import type {UserApi} from "@src/types/user";

export async function getUser(param: { id?: User["id"], name?: User["name"] }) {
	const info = await api<UserApi>(`/user`, {params: param})
			.then(r => r.data)
			.catch(notFound)

	info.user._id = info.user._id.toString()

	return info
}

export async function getUsers() {
	return await api<User[]>(`/users`).then(r => r.data).catch(notFound)
}

export async function getCases() {
	return await api<Case[]>(`/cases`).then(r => r.data).catch(notFound)
}

export async function getDrops() {
	return await api<Drop[]>(`/drops`).then(r => r.data).catch(notFound)
}