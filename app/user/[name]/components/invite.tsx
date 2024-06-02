import type {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "../profile.module.scss";

export function InviteSection({user, access}: { user: User, access: boolean }) {
	if (!access) return

	return (
			<section className="center_text">
				<h2>Пригласи друга</h2>
				<h3>и получи 5 рейтинга</h3>
				<p className="all_select unic_color break">
					{process.env.NEXT_PUBLIC_URL}?userId={user._id}&place=friend
				</p>
				{user?.from && user?.from?.userId && user?.from?.place &&
					<div className={styles.from}>
						<p>Вы пришли из {user.from.place} от</p>
						<UserBox _id={user.from.userId}/>
					</div>
				}
			</section>
	)
}