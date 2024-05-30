/*
"use client";

import {useState} from "react";
import {Case, Drop, RarityNames} from "@/types/case";
import type {RarityType} from "@/types/case";
import type {CaseData} from "@/types/purchase";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormSelect} from "@components/form";

type CasesPurchasesModal = {
	Cases: Case[]
	Drops: Drop[]
	modal: boolean
	setModal: setModal
}

export const CasesPurchasesModal = (
		{
			Cases, Drops,
			modal, setModal
		}: CasesPurchasesModal
) => {
	const [info, setInfo] = useState({} as CaseData)
	const rarityNames = Object.keys(RarityNames) as RarityType[]

	const updateData = (key: keyof CaseData, value: any) => {
		setInfo(prev => ({
			...prev,
			[key]: value
		}))
	}

	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Кейсы</h1>

				<Form action={() => {
				}}>
					<h2>Кейс</h2>
					<h3>Редкость</h3>
					<FormSelect className="center_text" onChange={e => {
						const _id = e.target.value
						const Case = Cases.find(Case => JSON.stringify(Case._id) === JSON.stringify(_id))
						updateData("Case")
					}}>
						{Cases.map(Case => (
								<option value={Case._id.toString()}>
									{Case.displayname}
								</option>
						))}
					</FormSelect>
					<h3>Дроп</h3>
					<FormSelect className="center_text" onChange={updateData("Drop")}>
						{Drops.map(Drop => (
								<option value={Drop._id.toString()}>
									{Drop.displayname}
								</option>
						))}
					</FormSelect>

					<h2>Предмет</h2>
					<h3>Дроп</h3>
					<FormSelect className="center_text" onChange={updateData("DropItem")}>
						{Drops.map(Drop => (
								<option value={Drop._id.toString()}>
									{Drop.displayname}
								</option>
						))}
					</FormSelect>
					<h3>Редкость</h3>
					<FormSelect className="center_text" onChange={updateData("rarity")}>
						{rarityNames.map(Rarity => (
								<option value={Rarity}>
									{RarityNames[Rarity]}
								</option>
						))}
					</FormSelect>
					<h3>Предмет</h3>
					<FormSelect className="center_text" onChange={updateData("Item")}>
						{/!*{info.DropItem.map(

						)}*!/}
					</FormSelect>

					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}*/
