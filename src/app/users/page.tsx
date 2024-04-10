// React
import type {Metadata} from "next";
import type {User} from "lucia";
import {getUsers} from "@src/services";

// Компоненты
import {Table} from "@components/table"
import {MaxSize} from "@components/maxSize";
import {columns} from "@columns/users"
import {validate} from "@server/validate";

export const metadata: Metadata = {
	title: "Игроки | Майнбридж",
	description: "Братья и сёстры всея Майнбридж!",
};

export default async function Component() {
	const users = await getUsers()
	const {isModer} = await validate()

	return (
			<main className="users">
				<MaxSize>
					<Table<User>
							columns={columns} 
							data={users}
							editable={isModer}
					>
						<h1>
							Игроки
						</h1>
					</Table>
				</MaxSize>
			</main>
	)
}