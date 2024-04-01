// Сервер
import {validate} from "@server/validate";
import {getUser} from "@src/service";

// Стили
import styles from "./profile.module.scss"

// Компоненты
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist_section";
import {Name} from "./components/name";
import {Mostiki} from "./components/mostiki";
import {Rating} from "./components/rating";
import {InviteSection} from "./components/invite_section";
import {Roles} from "./components/roles";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {user, roles, isModer} = await getUser({name})
	const {user: author} = await validate()

	const isMe = user.name === author?.name
	const access = isModer || isMe

	return (
			<div className={styles.profile}>
				<div className={styles.container}>
					<Avatar user={user} access={access}/>

					<div className={styles.text}>
						<Name user={user} access={access}/>
						<Roles roles={roles}/>
						<Mostiki user={user}/>
						<Rating user={user}/>
					</div>
				</div>

				<WhitelistSection user={user} access={access}/>

				<InviteSection user={user} isMe={isMe}/>
			</div>
	)
}