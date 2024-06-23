// Сервер
import {validate} from "@services/validate";
import {getUser} from "@/services";
import Link from "next/link";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {Social} from "@/types/url";

// Стили
import styles from "./profile.module.scss"

// Компоненты
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist";
import {FormBox} from "./components/form";
import {RconVC} from "@server/console";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {ColorText} from "@app/utils";
import {MostikiSvg, type SVGS_NAME} from "@ui/SVGS";
import {URLS_START} from "@/const";
import {SocialBox} from "@app/user/[name]/components/social";
import {User} from "lucia";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} | Майнбридж`,
	description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
})

export default async function Profile({params: {name}}: { params: { name: string } }) {
	const {user: author, isModer, isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const {user, roles, isMe, isContentMaker} = await getUser({name}, author?._id, isModer)

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

		revalidateTag(`user`)
	}

	async function updateCount(socialName: SVGS_NAME) {
		"use server"

		const userM = await userModel.findById(user._id)
		if (!userM) return

		const social = userM.socials.find(
				({social}) => social === socialName
		)
		if (!social) return

		social.clicked = (social?.clicked || 0) + 1
		await userM.save()

		revalidateTag("userLike")
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
						<div className={styles.social}>
							{user?.socials?.map((
									{
										social,
										url,
										name,
										clicked
									}: Social
							) => {
								if (!social || (!url && !name)) return

								url = url || `${URLS_START[social]}${name}`

								return (
										<SocialBox social={social} isMe={isMe} isModer={isModer} url={url} clicked={clicked} updateCount={updateCount} key={social}/>
								)
							})}
						</div>
						<div className={styles.roles}>
							{roles.map(role => {
								const color = `#${role.color.toString(16)}`
								return (
										<small key={role.id} style={{color}}>
											{role.name}
										</small>
								)
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

				<TwitchFrame user={user} isContentMaker={isContentMaker}/>
			</div>
	)
}

function TwitchFrame({isContentMaker, user}: { isContentMaker: boolean, user: User }) {
	if (!isContentMaker) return

	const twitchName = user?.socials?.find(({social}) => social === "twitch")?.name
	if (!twitchName) return

	return (
			<iframe
					src={`https://player.twitch.tv/?channel=${twitchName}&parent=${process.env.NEXT_PUBLIC_DOMEN}`}
					allowFullScreen
					frameBorder={0}
			/>
	)
}