"use client";

import {useState} from "react";
import {Case, Drop, RarityNames} from "@/types/case";
import type {RarityType} from "@/types/case";
import type {CaseData} from "@/types/purchase";
import {AddCasePurchase} from "@services/user";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormSelect} from "@components/form";
import {H1} from "@components/h1";

type CasesPurchasesModal = {
	Cases: Case[]
	Drops: Drop[]
	_id: string
	modal: boolean
	setModal: setModal
}

export const CasesPurchasesModal = (
		{
			Cases, Drops, _id,
			modal, setModal
		}: CasesPurchasesModal
) => {
	const [caseData, setCaseData] = useState<CaseData>({
		Case: Cases[0],
		Drop: Drops[0],
		DropItem: Drops[1],
		rarity: "common",
		Item: Drops[1].common![0]
	})
	const rarityNames = Object.keys(RarityNames) as RarityType[]

	const updateData = (key: keyof CaseData, value: any) => {
		setCaseData(prev => ({
			...prev,
			[key]: value
		}))
	}

	return (
			<Modal setModal={setModal} modal={modal}>
				<H1>Кейсы</H1>

				<Form action={() => {
					setModal(false)
					AddCasePurchase(_id, caseData)
				}}>
					<h2>Кейс</h2>
					<h3>Редкость</h3>
					<FormSelect className="center_text" onChange={e => {
						const name = e.target.value
						const Case = Cases.find(Case =>
								Case.name === name
						)
						if (!Case) return
						updateData("Case", Case)
					}}>
						{Cases.map(Case => (
								<option value={Case.name} key={Case.name}>
									{Case.displayname}
								</option>
						))}
					</FormSelect>
					<h3>Дроп</h3>
					<FormSelect className="center_text" onChange={e => {
						const name = e.target.value
						const Drop = Drops.find(Drop =>
								Drop.name === name
						)
						if (!Drop) return
						updateData("Drop", Drop)
						if (Drop?.name !== "all") {
							updateData("DropItem", Drop)
						}
					}}>
						{Drops.map(Drop => (
								<option value={Drop.name} key={Drop.name}>
									{Drop.displayname}
								</option>
						))}
					</FormSelect>

					<h2>Предмет</h2>
					<h3>Дроп</h3>
					<FormSelect className="center_text" onChange={e => {
						const name = e.target.value
						const DropItem = Drops.find(Drop =>
								Drop.name === name
						)
						if (!DropItem) return
						updateData("DropItem", DropItem)
					}}>

						{caseData.Drop?.name !== "all"
								? <option value={caseData.Drop?.name} key={caseData.Drop?.name}>
									{caseData.Drop?.displayname}
								</option>
								: Drops
										.filter(Drop => Drop.name !== "all")
										.map(Drop =>
												<option value={Drop.name} key={Drop.name}>
													{Drop.displayname}
												</option>
										)
						}
					</FormSelect>
					<h3>Редкость</h3>
					<FormSelect className="center_text" onChange={e => {
						updateData("rarity", e.target.value)
					}}>
						{caseData.DropItem.defaultRarity
								? <option value={caseData.DropItem.defaultRarity}>
									{RarityNames[caseData.DropItem.defaultRarity]}
								</option>
								: rarityNames.map(rarity => (
										<option value={rarity} key={rarity}>
											{RarityNames[rarity]}
										</option>
								))
						}
					</FormSelect>
					<h3>Предмет</h3>
					<FormSelect className="center_text" onChange={e => {
						const name = e.target.value
						const Item = caseData.DropItem[caseData.rarity]!.find(item =>
								item.name === name
						)
						if (!Item) return
						updateData("Item", Item)
					}}>
						{caseData.DropItem?.drop?.length === 0
								? caseData.DropItem[caseData.rarity]!.map(item =>
										<option value={item.name} key={item.name}>
											{item.displayname}
										</option>
								)
								: caseData.DropItem.drop!.map(item =>
										<option value={item.name} key={item.name}>
											{item.displayname}
										</option>
								)
						}
					</FormSelect>

					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}
