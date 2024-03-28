// Сервер
import type {User} from "lucia";
import type {PropsWithChildren} from "react";
import {notFound, redirect} from "next/navigation";
import {validate} from "@server/validate"
import {userModel} from "@server/models";
import {api} from "@server/axios";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {DiscordSvg, EmailSvg, GoogleSvg, SuccessSvg} from "@ui/svgs";
import {DeleteUser} from "./components";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}. Дискорд и гугл!`
})


export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const user = await api<User>(`/user`, {params: {name}}).then(r => r.data).catch(notFound)
	const {user: author} = await validate()

	const isMe = user.name === author?.name

	async function DeleteFunction() {
		"use server"

		await userModel.findOneAndDelete({name})

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
					{isMe &&
							<DeleteUser deleteFnc={DeleteFunction}/>
					}
				</div>
			</div>
	)
}

function Provider({id, name, isMe, children}: PropsWithChildren<{ id?: string, name: string, isMe: boolean }>) {
	if (!id && !isMe) {
		return null
	}

	return (
			<div className={styles.box}>
				{children}
				{id
						? <>
							<p className="all_select medium-font center_text">
								{isMe
										? id
										: `${"×".repeat(id.length - 4)}${id.substring(id.length - 4)}`
								}
							</p>
							<SuccessSvg/>
						</>
						: <a href={`/auth/${name}`} className="unic_color medium-font center_text" rel="noopener noreferrer">
							Привязать
						</a>
				}
			</div>
	)
}