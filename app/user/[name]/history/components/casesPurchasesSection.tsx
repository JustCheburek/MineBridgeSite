"use client"

// Сервер

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";
import Link from "next/link";
import {CasesPurchasesModal} from "@modals/casesPurchases";
import {useState} from "react";
import {Case, Drop} from "@/types/case";
import type {CaseData} from "@/types/purchase";
import {Form, FormButton} from "@components/form";

type CasesPurchasesSection = {
	caseDatas: CaseData[]
	access?: boolean
	isMe: boolean
	Cases: Case[]
	Drops: Drop[]
	SaveAll: Function
	casePurchaseFunc: Function
	GetAll: () => Promise<void>
}

export function CasesPurchasesSection(
		{
			caseDatas,
			access,
			isMe,
			Cases,
			Drops,
			SaveAll,
			casePurchaseFunc,
			GetAll
		}: CasesPurchasesSection) {
	const [click, setClick] = useState<boolean>(false)
	const [modal, setModal] = useState<boolean>(false)

	return (<>
		<Table
				columns={columns}
				data={caseDatas}
				editable={access}
				SaveAll={SaveAll}
				setModal={setModal}
				notFound={<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>}
		>
			<h2>
				Покупки кейсов
			</h2>
			{isMe &&
					<Form action={() => {
						GetAll()
						setClick(true)
					}}>
						<FormButton disabled={click}>
							Получить всё
						</FormButton>
					</Form>
			}
		</Table>
		<CasesPurchasesModal
				modal={modal} setModal={setModal} Cases={Cases} Drops={Drops}
				casePurchaseFunc={casePurchaseFunc}
		/>
	</>)
}