import type {User} from "lucia";

// Компоненты
// import {Edit} from "@components/form";

export const Name = ({user}: { user: User }) => (
		<h2 className="unic_color">
			<span className="all_select">{user.name}</span>

			{/*<Edit href={`/user/${user.name}/name`}/>*/}
		</h2>
)