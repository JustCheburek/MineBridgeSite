import {api} from "@server/axios";
import type {User} from "lucia";
import {notFound} from "next/navigation";
import {Case, Drop} from "@/types/case";
import type {UserApi} from "@/types/user";

export async function getUser(param: { id?: User["id"], name?: User["name"] }) {
	return await api<UserApi>(`/user`, {params: param})
			.then(r => r.data)
			.catch(notFound)
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