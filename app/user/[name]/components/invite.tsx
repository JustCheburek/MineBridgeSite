import type {User} from "lucia";

export function InviteSection({user, inviter, access}: {user: User, inviter?: User, access: boolean}) {
	if (!access) {
		if (!inviter) return

		return (
				<section className="center_text">
					<h2>Пришёл от <span className="all_select unic_color medium-font">{inviter.name}</span></h2>
				</section>
		)
	}

	return (
			<section className="center_text">
			<h2>Пригласи друга</h2>
				<h3>и получи 5 рейтинга</h3>
				{inviter &&
						<p>Вы пришли от: <span className="all_select unic_color medium-font">{inviter.name}</span></p>
				}
				<p className="all_select unic_color">
					{process.env.MB_URL}?userId={user._id}&place=friend
				</p>
			</section>
	)
}