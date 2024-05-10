"use client"

// React
import {useState} from "react";
import {User} from "lucia";

// Колонна
import {Punishment} from "@/types/punishment";
import {columns} from "@columns/punishments";

// Компоненты
import {Table} from "@components/table";
import {RatingModal} from "@modals/ratingModal";
import Link from "next/link";

type PunishmentSection = {
	user: User, author: User | null
	access: boolean, SaveAll: Function
}

export function PunishmentSection({user, author, access, SaveAll}: PunishmentSection) {
	const [modal, setModal] = useState<boolean>(false)

	return (<>
		<Table<Punishment>
				columns={columns}
				data={user.punishments}
				editable={access}
				setModal={setModal}
				SaveAll={SaveAll}
				notFound={<Link href="/rules" className="unic_color medium-font">Как повышать рейтинг?</Link>}
		>
			<h2>
				Рейтинг
			</h2>
		</Table>
		<RatingModal modal={modal} setModal={setModal} user={user} author={author} access={access}/>
	</>)
}