// Сервер
import {validate} from "@services/validate";
import {getUser} from "@/services";
import Link from "next/link";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Стили
import styles from "./profile.module.scss"

// Компоненты
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist";
import {FormBox} from "./components/form";
import {RconVC} from "@server/console";
import {userModel} from "@server/models";
import {revalidatePath} from "next/cache";
import {ColorText} from "@app/utils";
import {MostikiSvg} from "@ui/svgs";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {user: author, isModer, isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {user, roles, isMe} = await getUser({name}, author?._id, isModer)

	if (author && (!author?.from || !author.from?.place || !author.from?.userId)) {
		await userModel.findByIdAndUpdate(
				author._id,
				{from: await userModel.From(author)}
		)
	}

	async function WhitelistFunc() {
		"use server"

		try {
			const client = await RconVC()
			console.log(`Добавляю в Whitelist: ${user.name}`)
			await client.run(`vclist add ${user.name}`)

			await userModel.findByIdAndUpdate(user._id, {whitelist: true})
		} catch (e) {
			console.error(e)
		}

		revalidatePath(`/user/${user.name}`)
	}

	return (
			<div className={styles.profile}>
				<FormBox author={author}/>

				<div className={styles.container}>
					<Avatar photo={user.photo}/>

					<div className={styles.text}>
						<h2 className="unic_color">
							<span className="all_select">{user.name}</span>
						</h2>
						{isAdmin &&
								<small className="light_gray_color">Айди: <span className="all_select">{user._id}</span></small>
						}
						<div className={styles.roles}>
							{roles.map(role => {
								const color = `#${role.color.toString(16)}`
								return <small key={role.id} style={{color}}>
									{role.name}
								</small>
							})}
						</div>
						<h4>
							Мостики: {" "}
							<strong className={ColorText(user.mostiki)}>
								{user.mostiki}
							</strong>{" "}
							<MostikiSvg/>{" "}
							<Link href="/shop" className="add">+</Link>
						</h4>
						<h4>
							Соц рейтинг: {" "}
							<strong className={ColorText(user.rating)}>
								{user.rating}
							</strong>
						</h4>
					</div>
				</div>

				<WhitelistSection user={user} isMe={isMe} isModer={isModer} WhitelistFunc={WhitelistFunc}/>
			</div>
	)
}