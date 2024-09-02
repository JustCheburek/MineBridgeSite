"use server";

// React, Next
import axios from "axios";
import {User} from "lucia";
import {revalidateTag} from "next/cache";
import {SocialName} from "@/const";

// Сервер
import {RconVC} from "@server/console";
import {userModel} from "@server/models";

// Типы
import {Action, Punishment} from "@/types/punishment";
import type {GuildDSUser} from "@/types/user";
import {CaseData, CasePurchase} from "@/types/purchase";
import {Social} from "@/types/url";
import {redirect} from "next/navigation";

export async function AddWhitelist(_id: string, name: string) {
	try {
		const client = await RconVC()
		console.log(`Добавляю в Whitelist: ${name}`)
		await client.run(`vclist add ${name}`)

		await userModel.findByIdAndUpdate(_id, {whitelist: true})
	} catch (e) {
		console.error(e)
	}

	revalidateTag(`userLike`)
}

export async function ClickSocial(_id: string, socialName: SocialName) {
	const userM = await userModel.findById(_id)
	if (!userM) return

	const social = userM.socials.find(
			({social}) => social === socialName
	)
	if (!social) return

	social.clicked = (social?.clicked || 0) + 1
	await userM.save()

	revalidateTag("userLike")
}

export async function CheckActions(user: User, actions: Action[]) {
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

export async function SavePunishments(_id: string, data: Punishment[]) {
	await userModel.findByIdAndUpdate(
			_id,
			{
				punishments: data,
				rating: data.reduce(
						(accum, {rating}) => accum + rating, 0
				)
			}
	)

	revalidateTag("userLike")
}

export async function AddPunishment(user: User, punishment: Punishment, actions: Action[]) {
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

	await CheckActions(user, actions)

	revalidateTag("userLike")
}

export async function AddCasePurchase(_id: string, casePurchase: CaseData, access: boolean) {
	if (!access) return

	const casePurchaseDB: CasePurchase = {
		...casePurchase,
		Case: casePurchase.Case._id,
		Drop: casePurchase.Drop._id,
		DropItem: casePurchase.DropItem._id,
		Item: casePurchase.Item._id
	}

	await userModel.findByIdAndUpdate(
			_id,
			{
				$push: {
					casesPurchases: casePurchaseDB
				},
			}
	)

	revalidateTag("userLike")
}

export async function GetAll(name: string, caseDatas: CaseData[]) {
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
			await client.run(`lpv user ${name} permission set ultracosmetics.${DropItem.name}.${Item.name}`)
			await wait(1000)
		}
	}
}

export async function UpdateProfile(user: User, formData: FormData, isAdmin: boolean) {
	"use server"

	const name = formData.get("name") as string
	const photo = formData.get("photo") as string

	if (name !== user.name) {
		const candidate = await userModel.findOne({name})
		if (candidate) {
			throw new Error(`Ник занят`)
		}
	}

	const socials: Social[] = [
		{name: formData.get("youtube")?.toString(), social: "youtube"},
		{name: formData.get("twitch")?.toString(), social: "twitch"},
		{name: formData.get("vk")?.toString(), social: "vk"},
		{name: formData.get("donationAlerts")?.toString(), social: "donationAlerts"},
		{url: formData.get("discord")?.toString(), social: "discord"},
		{url: formData.get("telegram")?.toString(), social: "telegram"},
	]

	socials.forEach(({url, social}) => {
		if (url && !url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/)) {
			throw new Error(`Некорректная ссылка в ${social}`)
		}
	})

	let mostiki = user.mostiki
	if (isAdmin) {
		mostiki = Number(formData.get("mostiki"))
	}

	if (user.name !== name) {
		// Убирание из whitelist
		const client = await RconVC()
		await client.run(`vclist remove ${user.name}`)

		await userModel.findByIdAndUpdate(
				user._id,
				{whitelist: false}
		)

		// Смена акка
		await client.run(`librelogin user migrate ${user.name} ${name}`)
	}

	await userModel.findByIdAndUpdate(user._id, {name, photo, mostiki, socials})

	revalidateTag("userLike")

	return
}

export async function DeleteUser(_id: string) {
	"use server"

	await userModel.findByIdAndDelete(_id)

	revalidateTag("userLike")
	redirect("/auth")
}