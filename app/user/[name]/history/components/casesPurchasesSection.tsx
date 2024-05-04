"use client"

// Сервер
import type {User} from "lucia";

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";
import Link from "next/link";
import {CasesPurchasesModal} from "@modals/casesPurchasesModal";
import {useState} from "react";
import {Case, Drop, Item, type RarityType} from "@/types/case";

type CasesPurchasesSection = {
	user: User,
	access: boolean
	Cases: Case[],
	Drops: Drop[]
	SaveAll: Function
}

export type data = {
	Case: Case
	Drop: Drop
	Item: Item
	rarity: RarityType
	createdAt?: Date
	updatedAt?: Date
}

export async function CasesPurchasesSection({user, access, Cases, Drops, SaveAll}: CasesPurchasesSection) {
	const [modal, setModal] = useState<boolean>(false)

	const data = [] as data[]

	user.casesPurchases.forEach(purchase => {
		const Case = Cases.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Case))
		const Drop = Drops.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Drop))
		if (!Case || !Drop) return console.log("No case or drop")

		// Items
		let {drop: items} = Drop
		if (items?.length === 0) {
			items = Drop[purchase.rarity!]
		}
		if (!items) return console.log("No items")

		const Item = items.find(({_id}) =>
				JSON.stringify(_id) === JSON.stringify(purchase.Item)
		)

		if (!Item) return console.log("No item")

		data.push({
			...purchase,
			Case,
			Drop,
			Item
		})
	})

	return (<>
		<Table
				columns={columns}
				data={data}
				editable={access}
				SaveAll={SaveAll}
				setModal={setModal}
				notFound={<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>}
		>
			<h2>
				Покупки кейсов
			</h2>
		</Table>
		<CasesPurchasesModal modal={modal} setModal={setModal} user={user} access={access}/>
	</>)
}