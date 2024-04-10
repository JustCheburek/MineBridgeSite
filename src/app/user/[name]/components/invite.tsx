import type {User} from "lucia";

export function InviteSection({user, access}: {user: User, access: boolean}) {
	if (!access) return

	return (
			<section className="center_text">
				<h2>Пригласи друга</h2>
				<h3>и получи 5 мостиков</h3>
				<p className="all_select unic_color">{process.env.MB_URL}?userId={user._id}&place=friend</p>
			</section>
	)
}