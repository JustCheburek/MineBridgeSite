import {MaxSize} from "@components/maxSize";
import {getUsers} from "@/services";
import type {Metadata} from "next";
import {revalidateTag} from "next/cache";
import {H1} from "@components/h1";
import {Invites, New, Online} from "./components";

export const metadata: Metadata = {
	title: "Аналитика",
	description: "Количество онлайна и новичков на сервере, капец!"
};

export default async function Analytics() {
	const users = await getUsers()

	return (
			<MaxSize className="grid_center">

				<H1 reload={async () => {
					"use server";
					revalidateTag("seasons")
				}} paths={[
					{name: "features", displayname: "Фичи"},
					{name: "analytics", displayname: "Аналитика"}
				]}>
					Аналитика
				</H1>

				<Online users={users}/>

				<New users={users}/>

				<Invites users={users}/>
			</MaxSize>
	)
}