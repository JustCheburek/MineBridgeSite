import {HeaderClient} from "@components/headerClient";
import {validate} from "@services//validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export async function Header() {
	const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	async function Logout() {
		"use server"

		cookies().delete("minebridge-session")
	}

	return <HeaderClient user={user} Logout={Logout}/>
}