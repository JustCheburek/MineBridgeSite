import {HeaderClient} from "@components/headerClient";
import {validate} from "@services//validate";
import {cookies} from "next/headers";

export async function Header() {
	const {user} = await validate()

	async function Logout() {
		"use server"

		const cookiesStore = await cookies()
		cookiesStore.delete("minebridge-session")
	}

	return <HeaderClient user={user} Logout={Logout}/>
}