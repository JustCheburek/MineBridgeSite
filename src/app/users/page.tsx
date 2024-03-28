// React
import type {Metadata} from "next";
import type {User} from "lucia";
import {api} from "@server/axios";

// Стили
import "./styles/users.scss"

// Компоненты
import {Table} from "@components/table"
import {MaxSize} from "@components/maxSize";
import {columns} from "@columns/users"
import {notFound} from "next/navigation";

export const metadata: Metadata = {
	title: "Игроки | Майнбридж",
	description: "Братья и сёстры всея Майнбридж!",
};

export default async function Component() {
	const users = await api<User[]>("/users").then(r => r.data).catch(notFound)

	return (
			<main className="users">
				<MaxSize>
					<Table<User>
							columns={columns} data={users} className="center_text"
					>
						<h1>
							Игроки
						</h1>
					</Table>
				</MaxSize>
			</main>
	)
}