import {MaxSize} from "@components/maxSize";
import {getUsers} from "@/services";
import type {Metadata} from "next";
import {revalidateTag} from "next/cache";
import {H1} from "@components/h1";
import {Invites, Online} from "./components";

export const metadata: Metadata = {
	title: "Аналитика",
	description: "Сколько человек на сервере и откуда пришли, капец!",
	openGraph: {
		title: "Аналитика",
		description: "Сколько человек на сервере и откуда пришли, капец!",
	},
	twitter: {
		title: "Аналитика",
		description: "Сколько человек на сервере и откуда пришли, капец!",
	}
};

export default async function Analytics() {
	const users = await getUsers()

	return (
			<MaxSize className="grid_center">
				<H1 reload={async () => {
					"use server";
					revalidateTag("seasons")
				}}>
					Аналитика
				</H1>

				<Online users={users}/>

				<Invites users={users}/>
			</MaxSize>
	)
}