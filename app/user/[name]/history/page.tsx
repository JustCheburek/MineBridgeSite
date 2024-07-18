// Сервер
import {getCases, getDrops, getUser} from "@/services";
import {validate} from "@services/validate";
import {CaseData} from "@/types/purchase";
import {revalidateTag} from "next/cache";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Стили
import styles from "./history.module.scss";

// Компоненты
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";
import {InviteSection} from "../components/invite";
import {H1} from "@components/h1";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Истории действий | Майнбридж`,
	description: `История рейтинга и всяких покупок игрока ${name}!`,
})

export default async function History({params: {name}}: { params: { name: string } }) {
	const {user: author, isModer, isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {
		user, isMe
	} = await getUser(
			{name}, true, author?._id, isModer
	)
	const Cases = await getCases()
	const Drops = await getDrops()

	const caseDatas = [] as CaseData[]

	user.casesPurchases.forEach(purchase => {
		const Case = Cases.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Case))
		const Drop = Drops.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.Drop))
		const DropItem = Drops.find(({_id}) => JSON.stringify(_id) === JSON.stringify(purchase.DropItem))
		if (!Case || !Drop || !DropItem) return console.log("No case or drop")

		// Items
		let {drop: items} = DropItem
		if (items?.length === 0) {
			items = DropItem[purchase.rarity!]
		}
		if (items?.length === 0 || !items) return console.log("No items")

		const Item = items.find(({_id}) =>
				JSON.stringify(_id) === JSON.stringify(purchase.Item)
		)

		if (!Item) return console.log("No item")

		caseDatas.push({
			...purchase,
			Case,
			Drop,
			DropItem,
			Item
		})
	})

	return (
			<div className={styles.content}>
				<H1 up reload={async () => {
					"use server";
					revalidateTag("author")
					revalidateTag("userLike")
				}}>
					История
				</H1>

				<InviteSection user={user} isMe={isMe} isModer={isModer}/>

				<PunishmentSection
						user={user} name={author?.name} access={isModer}
				/>

				<CasesPurchasesSection
						access={isAdmin} Cases={Cases} user={user}
						Drops={Drops} isMe={isMe} caseDatas={caseDatas}
				/>
			</div>
	)
}