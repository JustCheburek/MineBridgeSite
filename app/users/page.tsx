// React
import type {Metadata} from "next";
import type {User} from "lucia";
import {getUsers} from "@/services";

// Компоненты
import {Table} from "@components/table"
import {MaxSize} from "@components/maxSize";
import {columns} from "@columns/users"

export const metadata: Metadata = {
	title: "Игроки | Майнбридж",
	description: "Братья и сёстры всея Майнбридж!",
};

export default async function Component() {
	const users = await getUsers()

	return (
			<main className="users">
				<MaxSize>
					<Table<User>
							columns={columns} 
							data={users}
					>
						<h1>
							Игроки
						</h1>
					</Table>
				</MaxSize>
			</main>
	)
}