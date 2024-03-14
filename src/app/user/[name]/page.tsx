// Сервер
import type {User} from "lucia";
import {validate} from "@server/validate";
import {Rcon} from "@server/console";
import {api} from "@server/axios";
import {userModel} from "@server/models";

// Стили
import styles from "./profile.module.scss"

// Компоненты
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist_section";
import {Name} from "./components/name";
import {Mostiki} from "./components/mostiki";
import {Rating} from "./components/rating";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {data: user}: { data: User | null } = await api(`/user?name=${name}`)
	const {user: author} = await validate()

	if (!user) {
		return new Response("Пользователь не найден", {
			status: 404,
		})
	}

	const isMe = user.name === author?.name

	async function whitelistFunc() {
		"use server"

		const client = await Rcon()
		console.log(`Добавляю в Whitelist: ${name}`)
		await client.run(`whitelist add ${name}`)

		await userModel.findOneAndUpdate({name}, {whitelist: true})
	}

	return (
			<div>
				<div className={styles.container}>
					<Avatar user={user}/>

					<div>
						<Name user={user}/>
						<Mostiki user={user}/>
						<Rating user={user}/>
					</div>
				</div>

				<WhitelistSection user={user} isMe={isMe} func={whitelistFunc}/>
			</div>
	)
}