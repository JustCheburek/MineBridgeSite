import type {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "../profile.module.scss";

export function InviteSection({user, isMe, isModer}: { user: User, isMe: boolean, isModer: boolean }) {
	return (
			<section className="center_text grid_center">
				<h2>Приглашения</h2>
				<h3>1 приглашение = 5 рейтинга</h3>
				{isMe &&
						<p className="all_select unic_color break">
							{process.env.NEXT_PUBLIC_URL}?userId={user._id}&place=friend
						</p>
				}
				<FromBox user={user} isMe={isMe} isModer={isModer}/>
				{user.invites.map(userId => (
						<UserBox key={userId} _id={userId}/> || `${userId}`
				))}
			</section>
	)
}

function FromBox({user, isMe, isModer}: { user: User, isMe: boolean, isModer: boolean }) {
	if (!user?.from || !user.from?.userId || !user.from?.place) return

	return (
			<div className={styles.from}>
				<p>
					{isMe
							? "Вы пришли"
							: "Пришёл"
					} от
				</p>
				<UserBox _id={user.from.userId}/>
				{isModer &&
						<p className="unic_color">{user.from.place}</p>
				}
			</div>
	)
}