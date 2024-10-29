import {HeaderClient} from "@components/headerClient";
import {validate} from "@services//validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export async function Header() {
	const cookiesStore = await cookies()
	const {user} = await validate()

	async function Logout() {
		"use server"

		cookiesStore.delete("minebridge-session")
	}

	return <HeaderClient user={user} Logout={Logout}/>
}