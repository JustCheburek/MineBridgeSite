// Сервер
import {validate} from "@services/validate";
import {getUser} from "@/services";

// Стили
import styles from "./profile.module.scss"

// Компоненты
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist";
import {Name} from "./components/name";
import {Mostiki} from "./components/mostiki";
import {Rating} from "./components/rating";
import {InviteSection} from "./components/invite";
import {Roles} from "./components/roles";
import {FormBox} from "./components/form";
import {Rcon} from "@server/console";
import {userModel} from "@server/models";
import {revalidatePath} from "next/cache";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {user: author, isModer, isAdmin} = await validate()
	const {user, roles, isMe} = await getUser({name}, author?._id, isModer)

	const moderAccess = isModer || isMe

	async function WhitelistFunc() {
		"use server"

		try {
			const client = await Rcon()
			console.log(`Добавляю в Whitelist: ${user.name}`)
			await client.run(`whitelist add ${user.name}`)

			await userModel.findByIdAndUpdate(user._id, {whitelist: true})
		} catch(e) {
			console.error(e)
		}

		revalidatePath(`/user/${user.name}`)
	}

	return (
			<div className={styles.profile}>
				<FormBox author={author}/>

				<div className={styles.container}>
					<Avatar user={user}/>

					<div className={styles.text}>
						<Name user={user}/>
						{isAdmin &&
								<small className="light_gray_color">Айди: <span className="all_select">{user._id}</span></small>
						}
						<Roles roles={roles}/>
						<Mostiki user={user}/>
						<Rating user={user}/>
					</div>
				</div>

				<WhitelistSection user={user} access={moderAccess} WhitelistFunc={WhitelistFunc}/>

				<InviteSection user={user} access={isMe}/>
			</div>
	)
}