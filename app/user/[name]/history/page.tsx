// Сервер
import axios from "axios";
import {getCases, getDrops, getUser} from "@/services";
import {validate} from "@services/validate";
import {userModel} from "@server/models";
import {Action, Punishment} from "@/types/punishment";
import {CaseData, CasePurchase} from "@/types/purchase";
import {revalidateTag} from "next/cache";
import {RconVC} from "@server/console";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import type {GuildDSUser} from "@/types/user";

// Стили
import styles from "./history.module.scss";

// Компоненты
import {PunishmentSection} from "./components/ratingSection";
import {CasesPurchasesSection} from "./components/casesPurchasesSection";
import {InviteSection} from "../components/invite";

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

	async function checkBan(actions: Action[]) {
		"use server"

		if (actions.length === 0) return

		try {
			if (actions.includes("mineBan")) {
				const client = await RconVC()
				console.log(`Бан ${user.name}`)
				await client.run(`vclist remove ${user.name}`)
				await client.run(`ban ${user.name} Нарушение правил сервера`)
				if (actions.includes("rollback")) {
					await client.run(`co rollback action: block user: ${user.name} time: 5d`)
					await client.run(`co rollback action: container user: ${user.name} time: 5d`)
				}
				await userModel.findByIdAndUpdate(user._id, {whitelist: false})
			}
			if (actions.includes("minePardon")) {
				const client = await RconVC()
				console.log(`Разбан ${user.name}`)
				await client.run(`unban ${user.name}`)
				await client.run(`vclist add ${user.name}`)

				await userModel.findByIdAndUpdate(user._id, {whitelist: true})
			}
		} catch (e) {
			console.error(e)
		}

		if (actions.includes("dsBan")) {
			await axios.put(
					`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
					{delete_message_days: 7},
					{
						headers: {
							Authorization: `Bot ${process.env.DISCORD_TOKEN}`
						}
					}
			).catch(console.error)
			return
		}
		if (actions.includes("dsPardon")) {
			await axios.delete(
					`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/bans/${user.discordId}`,
					{
						headers: {
							Authorization: `Bot ${process.env.DISCORD_TOKEN}`
						}
					}
			).catch(console.error)
		}

		if (actions.includes("mute") || actions.includes("unmute")) {
			try {
				const client = await RconVC()
				if (actions.includes("mute")) {
					console.log(`Мут ${user.name}`)
					await client.run(`mute ${user.name}`)
				}
				if (actions.includes("unmute")) {
					console.log(`Размут ${user.name}`)
					await client.run(`unmute ${user.name}`)
				}
			} catch (e) {
				console.error(e)
			}

			if (!user.discordId) return

			const guildMember = await axios.get<GuildDSUser | null>(
					`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}`,
					{
						headers: {
							Authorization: `Bot ${process.env.DISCORD_TOKEN}`
						}
					}
			).then(r => r.data).catch(console.error)

			const isMuted = guildMember?.roles?.includes(process.env.DISCORD_MUTE_ROLE_ID!)

			if (actions.includes("mute")) {
				if (isMuted) return

				// Добавление роли mute
				await axios.put(
						`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}/roles/${process.env.DISCORD_MUTE_ROLE_ID}`,
						{},
						{
							headers: {
								Authorization: `Bot ${process.env.DISCORD_TOKEN}`
							}
						}
				).catch(console.error)
			}
			if (actions.includes("unmute")) {
				if (!isMuted) return

				// Убирание роли mute
				await axios.delete(
						`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${user.discordId}/roles/${process.env.DISCORD_MUTE_ROLE_ID}`,
						{
							headers: {
								Authorization: `Bot ${process.env.DISCORD_TOKEN}`
							}
						}
				).catch(console.error)
			}
		}
	}

	async function PunishmentSave(data: Punishment[]) {
		"use server"

		await userModel.findByIdAndUpdate(
				user._id,
				{
					punishments: data,
					rating: data.reduce(
							(accum, {rating}) => accum + rating, 0
					)
				}
		)

		revalidateTag("userLike")
	}

	async function ratingFunc(punishment: Punishment, actions: Action[]) {
		"use server"

		if (punishment.reason && punishment.rating) {
			await userModel.findByIdAndUpdate(
					user._id,
					{
						$push: {
							punishments: punishment
						},
						$inc: {
							rating: punishment.rating
						}
					}
			)
		}

		await checkBan(actions)

		revalidateTag("userLike")
	}

	async function CasesPurchasesSave(datas: CaseData[]) {
		"use server"

		const userUpdate = await userModel.findById(user._id)
		if (!userUpdate) return

		userUpdate.casesPurchases = []

		datas.forEach(data => {
			userUpdate.casesPurchases.push({
				...data,
				Case: data.Case._id,
				Drop: data.Drop._id,
				DropItem: data.DropItem._id,
				Item: data.Item._id
			})
		})

		await userUpdate.save()

		revalidateTag("userLike")
	}

	async function casePurchaseFunc(casePurchase: CaseData) {
		"use server"

		const casePurchaseDB: CasePurchase = {
			...casePurchase,
			Case: casePurchase.Case._id,
			Drop: casePurchase.Drop._id,
			DropItem: casePurchase.DropItem._id,
			Item: casePurchase.Item._id
		}

		await userModel.findByIdAndUpdate(
				user._id,
				{
					$push: {
						casesPurchases: casePurchaseDB
					},
				}
		)

		revalidateTag("userLike")
	}

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

	async function GetAll() {
		"use server"

		function wait(ms: number) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve("Готово");
				}, ms);
			});
		}

		const client = await RconVC()

		for (const {DropItem, Item} of caseDatas) {
			if (DropItem.name !== "suffix") {
				await client.run(`lpv user ${user.name} permission set ultracosmetics.${DropItem.name}.${Item.name}`)
				await wait(1000)
			}
		}
	}

	return (
			<div className={styles.content}>
				<h1>История</h1>

				<InviteSection user={user} isMe={isMe} isModer={isModer}/>

				<PunishmentSection
						user={user} name={author?.name} access={isModer} SaveAll={PunishmentSave}
						ratingFunc={ratingFunc}
				/>

				<CasesPurchasesSection
						access={isAdmin} SaveAll={CasesPurchasesSave} Cases={Cases} GetAll={GetAll}
						Drops={Drops} casePurchaseFunc={casePurchaseFunc} isMe={isMe} caseDatas={caseDatas}
				/>
			</div>
	)
}