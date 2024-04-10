"use client"

// Сервер
import {CasePurchase} from "@src/types/purchase";
import type {User} from "lucia";

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";
import Link from "next/link";
import {CasesPurchasesModal} from "@modals/casesPurchasesModal";
import {useState} from "react";


export function CasesPurchasesSection({user, access, SaveAll}: { user: User, access: boolean, SaveAll: Function }) {
	const [modal, setModal] = useState<boolean>(false)

	return (<>
		<Table<CasePurchase>
				columns={columns}
				data={user.casesPurchases}
				editable={access}
				setModal={setModal}
				SaveAll={SaveAll}
				notFound={<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>}
		>
			<h2>
				Покупки кейсов
			</h2>
		</Table>
		<CasesPurchasesModal modal={modal} setModal={setModal} user={user} access={access}/>
	</>)
}