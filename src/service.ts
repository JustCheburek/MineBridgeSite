import {api} from "@server/axios";
import type {User} from "lucia";
import {notFound} from "next/navigation";
import {Case, Drop} from "@src/types/case";

export async function UserGet(param: { id?: User["id"], name?: User["name"] }): Promise<User> {
	return await api<User>(`/user`, {params: param}).then(r => r.data).catch(notFound)
}

export async function UsersGet(): Promise<User[]> {
	return await api<User[]>(`/users`).then(r => r.data).catch(notFound)
}

export async function CasesGet(): Promise<Case[]> {
	return await api<Case[]>(`/cases`).then(r => r.data).catch(notFound)
}

export async function DropsGet(): Promise<Drop[]> {
	return await api<Drop[]>(`/drops`).then(r => r.data).catch(notFound)
}