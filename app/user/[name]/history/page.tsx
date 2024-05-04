// Сервер
import {getUser} from "@/services";
import {validate} from "@server/validate";
import {caseModel, dropModel, userModel} from "@server/models";
import {Punishment} from "@/types/punishment";
import {CasePurchase} from "@/types/purchase";

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
	const Cases = await caseModel.find().lean()
	const Drops = await dropModel.find().lean()

	async function PunishmentSave(data: Punishment[]){
		"use server"

		const userUpdate = await userModel.findById(user._id)
		if (!userUpdate) return

		userUpdate.punishments = data
		await userUpdate.save()
	}

	async function CasesPurchasesSave(data: CasePurchase[]){
		"use server"

		const userUpdate = await userModel.findById(user._id)
		if (!userUpdate) return

		userUpdate.casesPurchases = data
		await userUpdate.save()
	}

	return (
			<div className={styles.content}>
				<h1>История</h1>

				<PunishmentSection user={user} access={isModer} SaveAll={PunishmentSave}/>

				<CasesPurchasesSection user={user} access={isAdmin} SaveAll={CasesPurchasesSave} Cases={Cases} Drops={Drops}/>
			</div>
	)
}