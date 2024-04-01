// Сервер
import type {PropsWithChildren} from "react";
import {redirect} from "next/navigation";
import {validate} from "@server/validate"
import {userModel} from "@server/models";
import Link from "next/link";
import {getUser} from "@src/service";

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
	const {user, isAdmin} = await getUser({name})
	const {user: author} = await validate()

	const access = isAdmin || user.name === author?.name

	async function DeleteFunction(formData: FormData) {
		"use server"

		const name = formData.get("name")?.toString()

		if (!name || !access || name !== user.name) return

		await userModel.findByIdAndDelete(user._id)

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
							access={access}
					>
						<EmailSvg width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="discord"
							id={user.discordId}
							access={access}
					>
						<DiscordSvg className={`color ${styles.ds}`} width="1.5em" height="1.5em"/>
					</Provider>
					<Provider
							name="google"
							id={user.googleId}
							access={access}
					>
						<GoogleSvg width="1.5em" height="1.5em"/>
					</Provider>
				</div>
				{access &&
						<DeleteUser name={user.name} deleteFnc={DeleteFunction}/>
				}
			</div>
	)
}

function Provider({id, name, access, children}: PropsWithChildren<{ id?: string, name: string, access: boolean }>) {
	if (!id && !access) {
		return null
	}

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