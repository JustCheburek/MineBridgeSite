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
// import {InviteSection} from "./components/invite";
import {Roles} from "./components/roles";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export async function preload({params: {name}}: { params: { name: string } }) {
	void await getUser({name})
}

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {user, roles} = await getUser({name})
	const {user: author, isModer, isAdmin} = await validate()

	const isMe = user.name === author?.name
	const moderAccess = isModer || isMe

	return (
			<div className={styles.profile}>
				<div className={styles.container}>
					<Avatar user={user} access={moderAccess}/>

					<div className={styles.text}>
						<Name user={user} access={moderAccess}/>
						<Roles roles={roles}/>
						<Mostiki user={user} access={isAdmin}/>
						<Rating user={user}/>
					</div>
				</div>

				<WhitelistSection user={user} access={moderAccess}/>

				{/*<InviteSection user={user} access={isMe}/>*/}
			</div>
	)
}