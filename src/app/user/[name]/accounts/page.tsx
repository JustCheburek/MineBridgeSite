// Сервер
import type {PropsWithChildren} from "react";
import {redirect} from "next/navigation";
import {validate} from "@server/validate"
import {userModel} from "@server/models";
import Link from "next/link";
import {UserGet} from "@src/service";

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
	const user = await UserGet({name})
	const {user: author} = await validate()

	const isMe = user.name === author?.name

	async function DeleteFunction(formData: FormData) {
		"use server"

		const name = formData.get("name")

		if (name !== user.name) {
			return
		}

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
				</div>
				{isMe &&
						<DeleteUser name={user.name} deleteFnc={DeleteFunction}/>
				}
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
							<p className={`all_select medium-font center_text ${styles.id}`}>
								{isMe
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