// Сервер
import type {PropsWithChildren} from "react";
import {validate} from "@services/validate"
import Link from "next/link";
import {getUser} from "@/services";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {DiscordSvg, EmailSvg, GoogleSvg, SuccessSvg} from "@ui/svgs";
import {DeleteUser} from "./components";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}. Дискорд и гугл!`
})

export async function preload({params: {name}}: { params: { name: string } }) {
	void await getUser({name})
}

export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const {user} = await getUser({name})
	const {user: author, isAdmin} = await validate()

	const isMe = user.name === author?.name
	const access = isAdmin || isMe

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
				{access &&
						<DeleteUser user={user} access={access}/>
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