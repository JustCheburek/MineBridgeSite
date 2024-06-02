import type {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "../profile.module.scss";

export function InviteSection({user, isMe, isModer}: { user: User, isMe: boolean, isModer: boolean }) {
	if (!isMe && !isModer) return

	return (
			<section className="center_text">
				<h2>Пригласи друга</h2>
				<h3>и получи 5 рейтинга</h3>
				<p className="all_select unic_color break">
					{process.env.NEXT_PUBLIC_URL}?userId={user._id}&place=friend
				</p>
				<FromBox user={user} isMe={isMe}/>
			</section>
	)
}

function FromBox({user, isMe}: { user: User, isMe: boolean }) {
	if (!user?.from || !user.from?.userId || !user.from?.place) return

	const text = isMe
		? "Вы пришли"
		: `Пришёл`

	return (
			<div className={styles.from}>
				<p>{text} от</p>
				<UserBox _id={user.from.userId}/>
				{!isMe &&
					<p className="unic_color">{user.from.place}</p>
				}
			</div>
	)
}