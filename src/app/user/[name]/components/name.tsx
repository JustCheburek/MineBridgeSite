import type {User} from "lucia";

export const Name = ({user}: { user: User }) => (
		<h2 className="nickname unic_color center_text">
			<span className="all_select">{user.name}</span>
		</h2>
)