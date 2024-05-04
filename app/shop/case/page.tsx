// Next
import type {Metadata} from "next";
import {getCases, getDrops} from "@/services";
import {validate} from "@server/validate";
import {caseModel, dropModel, userModel} from "@server/models";
import {Info} from "@/types/case";
import {Types} from "mongoose";

// Компоненты
import {CaseClient} from "./caseClient";

export const metadata: Metadata = {
	title: "Кейсы | MineBridge",
	description: "Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?",
};

export default async function CasePage() {
	const {user} = await validate()
	const cases = await getCases()
	const drops = await getDrops()

	async function Add(caseId: Types.ObjectId, info: Info) {
		"use server"

		const Case = await caseModel.findById(caseId)
		const Drop = await dropModel.findById(info?.drop?._id)

		if (!Case || !Drop) return console.log("No case or drop")

		// Item
		let {drop: items} = Drop
		if (items?.length === 0) {
			items = Drop[info.rarity!]
		}

		if (!items) return console.log("No items")

		const userM = await userModel.findOne({name: user?.name})
		if (!userM) return console.log("No user")

		userM.mostiki -= Case.price + Drop.price
		userM.casesPurchases.push({
			Item: info.item!._id,
			rarity: info.rarity!,
			Case: Case,
			Drop: Drop
		})

		await userM.save()
	}

	return (
			<CaseClient cases={cases} drops={drops} user={user} Add={Add}/>
	)
}