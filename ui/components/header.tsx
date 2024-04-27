import {HeaderClient} from "@components/headerClient";
import {validate} from "@server/validate";
import {cookies} from "next/headers";

export async function Header() {
	const {user} = await validate()

	async function Logout() {
		"use server"

		cookies().delete("minebridge-session")
	}

	return <HeaderClient user={user} Logout={Logout}/>
}