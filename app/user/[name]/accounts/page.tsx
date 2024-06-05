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

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}.`
})

export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const {
		user: author,
		isAdmin, isModer, isContentMaker
	} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {user, isMe} = await getUser({name}, author?._id, isModer)

	const adminAccess = isAdmin || isMe

	async function Change(formData: FormData) {
		"use server"

		const name = formData.get("name")
		const photo = formData.get("photo")

		const socials: Social[] = [
			{name: formData.get("youtube")?.toString(), social: "youtube"},
			{name: formData.get("twitch")?.toString(), social: "twitch"},
			{name: formData.get("vk")?.toString(), social: "vk"},
			{name: formData.get("donationAlerts")?.toString(), social: "donationAlerts"},
			{url: formData.get("discord")?.toString(), social: "discord"},
			{url: formData.get("telegram")?.toString(), social: "telegram"},
		]

		socials.forEach(({url}) => {
			if (url && !url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/)) {
				throw new Error(`Некорректная ссылка в ${name}`)
			}
		})

		let mostiki = user.mostiki
		if (isAdmin) {
			mostiki = Number(formData.get("mostiki"))
		}

		await userModel.findByIdAndUpdate(user._id, {name, photo, mostiki, socials})

		revalidateTag("userLike")
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

				<ChangeParam user={user} isMe={isMe} isModer={isModer} isAdmin={isAdmin} isContentMaker={isContentMaker}
				             Change={Change}/>

				<div className={styles.providers_box}>
					<Provider
							name="email"
							id={user.email}
							isMe={isMe}
					>
						<EmailSvg width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="discord"
							id={user.discordId}
							isMe={isMe}
					>
						<DiscordSvg className={`color ${styles.ds}`} width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="google"
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

function Provider({id, name, isMe, children}: PropsWithChildren<{
	id?: string,
	name: string,
	isMe: boolean
}>) {
	if (!id && !isMe) {
		return null
	}

	return (
			<div className={styles.box}>
				{children}
				{id
						? <>
							<p className={`all_select medium-font center_text ${styles.id}`}>
								{id}
							</p>
							<SuccessSvg/>
						</>
						: <Link href={`/auth/${name}?name=${name}`} className="unic_color medium-font center_text">
							Привязать
						</Link>
				}
			</div>
	)
}