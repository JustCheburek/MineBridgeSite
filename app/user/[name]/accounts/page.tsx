// Сервер
import type {PropsWithChildren} from "react";
import {validate} from "@services/validate"
import {getUser} from "@/services";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {AutoSvg, SuccessSvg} from "@ui/SVGS";
import {ChangeParam, DeleteUserBox} from "./components";
import {User} from "lucia";
import {H1} from "@components/h1";
import {CheckLink} from "@components/checkLink";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Аккаунты | Майнбридж`,
	description: `Привязанные интеграции игрока ${name}.`
})

const providers = {
	email: "email",
	discord: "discordId",
	google: "googleId"
}
type providerName = keyof typeof providers
const providersNames = Object.keys(providers) as providerName[]

export default async function Accounts({params: {name}}: { params: { name: string } }) {
	const {
		user: author,
		isAdmin, isModer
	} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {
		user, isMe, isContentMakerCheck
	} = await getUser(
			{name}, true, author?._id, isModer
	)

	const adminAccess = isAdmin || isMe

	return (
			<div className="account_content">
				<H1 up className={styles.for_bigger}>
					Аккаунты
				</H1>
				<H1 className={styles.for_smaller}>
					Акки
				</H1>

				{(isMe || isModer) &&
					<ChangeParam
						user={user} isMe={isMe}
						isModer={isModer} isAdmin={isAdmin}
						isContentMaker={isContentMakerCheck}
					/>
				}

				<div className={styles.providers_box}>
					{providersNames.map(id => (
							<Provider
									// @ts-ignore
									id={user[providers[id]]}
									name={id}
									key={id}
									user={user}
									isMe={isMe}
							>
								<AutoSvg
										type={id}
										size="1.5em"
										className={`color ${id === "discord" ? styles.ds : ""}`}
								/>
							</Provider>
					))}
				</div>
				{adminAccess &&
						<DeleteUserBox user={user} isAdmin={isAdmin}/>
				}
			</div>
	)
}

type Provider = {
	name: providerName
	isMe: boolean
	user: User
	id?: string
}

function Provider({id, user, name, isMe, children}: PropsWithChildren<Provider>) {
	if (!id && !isMe) {
		return null
	}

	return (
			<CheckLink href={name === "email" ? undefined : `/auth/${name}?name=${user.name}`}>
				<div className={styles.box}>
					{children}
					{id
							? <>
								<p className={`all_select medium-font center_text ${styles.id}`}>
									{id}
								</p>
								<SuccessSvg size="1.5em"/>
							</>
							: <span className="unic_color medium-font">
							Привязать
						</span>
					}
				</div>
			</CheckLink>
	)
}