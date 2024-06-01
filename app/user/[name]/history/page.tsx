// Сервер
import axios from "axios";
import {getCases, getDrops, getUser} from "@/services";
import {validate} from "@services/validate";
import {userModel} from "@server/models";
import {Action, Punishment} from "@/types/punishment";
import type {CaseData} from "@/types/purchase";
import {revalidateTag} from "next/cache";
import {Rcon} from "@server/console";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import type {GuildDSUser} from "@/types/user";

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
	const {user: author, isModer, isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {user} = await getUser({name}, author?._id, isModer)
	const Cases = await getCases()
	const Drops = await getDrops()

	async function checkBan(actions: Action[]) {
		"use server"

		if (actions.length === 0) return

		try {
			if (actions.includes("mineBan")) {
				const client = await Rcon()
				console.log(`Бан ${user.name}`)
				await client.run(`whitelist remove ${user.name}`)
				await client.run(`ban ${user.name}`)
			}
			if (actions.includes("minePardon")) {
				const client = await Rcon()
				console.log(`Разбан ${user.name}`)
				await client.run(`whitelist add ${user.name}`)
				await client.run(`pardon ${user.name}`)
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

	return (
			<div className={styles.content}>
				<h1>История</h1>

				<PunishmentSection
						user={user} name={author?.name} access={isModer} SaveAll={PunishmentSave}
						ratingFunc={ratingFunc}
				/>

				<CasesPurchasesSection
						user={user} access={isAdmin} SaveAll={CasesPurchasesSave} Cases={Cases}
						Drops={Drops}
				/>
			</div>
	)
}