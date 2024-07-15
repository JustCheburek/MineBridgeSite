import type {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "../profile.module.scss";
import {InviteLink} from "./inviteLink";

type InviteSection = {
	user: User, isMe: boolean, isModer: boolean, isContentMaker: boolean
}

export function InviteSection({user, isMe, isModer, isContentMaker}: InviteSection) {
	return (
			<section className="center_text grid_center">
				<h2>Приглашения</h2>
				<h3>1 приглашение = 5 рейтинга</h3>
				{isMe &&
						<InviteLink name={user.name} isContentMaker={isContentMaker}/>
				}
				<FromBox user={user} isMe={isMe} isModer={isModer}/>
				{user.invites.map(userId => (
						<UserBox key={userId} _id={userId}/>
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