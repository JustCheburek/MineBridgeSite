// Сервер
import type {PropsWithChildren} from "react";
import {validate} from "@services/validate"
import Link from "next/link";
import {getUser} from "@/services";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {DiscordSvg, EmailSvg, GoogleSvg, SuccessSvg} from "@ui/svgs";
import {ChangeParam, DeleteUser} from "./components";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}. Дискорд и гугл!`
})

export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const {user: author, isAdmin, isModer} = await validate()
	const {user, isMe} = await getUser({name}, author?._id, isModer)

	const adminAccess = isAdmin || isMe
	const moderAccess = isModer || isMe

	async function Change(formData: FormData) {
		"use server"

		const name = formData.get("name")
		const photo = formData.get("photo")

		await userModel.findByIdAndUpdate(user._id, {name, photo})

		revalidateTag("userLike")
		revalidateTag("users")
	}

	return (
			<div className="account_content">
				<h1 className={styles.for_bigger}>
					Аккаунты
				</h1>
				<h1 className={styles.for_smaller}>
					Акки
				</h1>

				<ChangeParam name={user.name} photo={user.photo} access={moderAccess} Change={Change}/>

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
						<DeleteUser user={user} access={adminAccess}/>
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
						: <Link href={`/auth/${name}`} className="unic_color medium-font center_text">
							Привязать
						</Link>
				}
			</div>
	)
}