// Сервер
import type {PropsWithChildren} from "react";
import {validate} from "@services/validate"
import Link from "next/link";
import {getUser} from "@/services";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {redirect} from "next/navigation";
import {Social} from "@/types/url";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {DiscordSvg, EmailSvg, GoogleSvg, SuccessSvg} from "@ui/SVGS";
import {ChangeParam, DeleteUser} from "./components";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {User} from "lucia";
import {RconVC} from "@server/console";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}.`
})

export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const {
		user: author,
		isAdmin, isModer
	} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {user, isMe, isContentMakerCheck} = await getUser({name}, author?._id, isModer)

	const adminAccess = isAdmin || isMe

	async function Change(formData: FormData) {
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

	async function Delete(formData: FormData) {
		"use server"

		const name = formData.get("name")

		if (!isMe && !isAdmin && name !== user.name) return

		await userModel.findByIdAndDelete(user._id)

		revalidateTag("userLike")
		redirect("/auth")
	}

	return (
			<div className="account_content">
				<h1 className={styles.for_bigger}>
					Аккаунты
				</h1>
				<h1 className={styles.for_smaller}>
					Акки
				</h1>

				<ChangeParam
						user={user} isMe={isMe} isModer={isModer} isAdmin={isAdmin} isContentMaker={isContentMakerCheck}
						Change={Change}
				/>

				<div className={styles.providers_box}>
					<Provider
							name="email"
							user={user}
							id={user.email}
							isMe={isMe}
					>
						<EmailSvg width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="discord"
							user={user}
							id={user.discordId}
							isMe={isMe}
					>
						<DiscordSvg className={`color ${styles.ds}`} width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="google"
							user={user}
							id={user.googleId}
							isMe={isMe}
					>
						<GoogleSvg width="1.5em" height="1.5em"/>
					</Provider>
				</div>
				{adminAccess &&
						<DeleteUser user={user} Delete={Delete}/>
				}
			</div>
	)
}

type Provider = {
	name: string
	isMe: boolean
	user: User
	id?: string
}

function Provider({id, user, name, isMe, children}: PropsWithChildren<Provider>) {
	if (!id && !isMe) {
		return null
	}

	return (
			<Link href={`/auth/${name}?name=${user.name}`} className={styles.box}>
				{children}
				{id
						? <>
							<p className={`all_select medium-font center_text ${styles.id}`}>
								{id}
							</p>
							<SuccessSvg/>
						</>
						: <span className="unic_color medium-font">
							Привязать
						</span>
				}
			</Link>
	)
}