import type {User} from "lucia";

export const Name = ({user}: { user: User }) => (
		<h2 className="unic_color">
			<span className="all_select">{user.name}</span>
		</h2>
)