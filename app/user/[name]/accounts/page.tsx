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
	const {user} = await getUser({name})
	const {user: author, isAdmin, isModer} = await validate()

	const isMe = user.name === author?.name
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
							isAdmin={isAdmin}
					>
						<EmailSvg width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="discord"
							id={user.discordId}
							isMe={isMe}
							isAdmin={isAdmin}
					>
						<DiscordSvg className={`color ${styles.ds}`} width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="google"
							id={user.googleId}
							isMe={isMe}
							isAdmin={isAdmin}
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

function Provider({id, name, isMe, isAdmin, children}: PropsWithChildren<{
	id?: string,
	name: string,
	isAdmin: boolean,
	isMe: boolean
}>) {
	if (!id && !isMe) {
		return null
	}

	const access = isAdmin || isMe

	return (
			<div className={styles.box}>
				{children}
				{id
						? <>
							<p className={`all_select medium-font center_text ${styles.id}`}>
								{access
										? id
										: `${"×".repeat(id.length - 4)}${id.substring(id.length - 4)}`
								}
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