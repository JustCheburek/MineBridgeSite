// Сервер
import {getUser} from "@src/services";
import {validate} from "@server/validate";
import {userModel} from "@server/models";
import {Punishment} from "@src/types/punishment";
import {CasePurchase} from "@src/types/purchase";

// Компоненты
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";

// Стили
import styles from "./history.module.scss";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Истории действий | Майнбридж`,
	description: `История рейтинга и всяких покупок игрока ${name}!`,
})

export default async function History({params: {name}}: { params: { name: string } }) {
	const {user} = await getUser({name})
	const {isModer, isAdmin} = await validate()

	async function PunishmentSave(data: Punishment[]){
		"use server"

		await userModel.findByIdAndUpdate(user._id, {punishments: data})
	}

	async function CasesPurchasesSave(data: CasePurchase[]){
		"use server"

		await userModel.findByIdAndUpdate(user._id, {casesPurchases: data})
	}

	return (
			<div className={styles.integration_content}>
				<h1>История</h1>

				<PunishmentSection user={user} access={isModer} SaveAll={PunishmentSave}/>

				<CasesPurchasesSection user={user} access={isAdmin} SaveAll={CasesPurchasesSave}/>
			</div>
	)
}