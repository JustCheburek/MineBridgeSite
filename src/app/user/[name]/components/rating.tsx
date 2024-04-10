// React
import {User} from "lucia";

// Utils
import {ColorText} from "@app/utils";

export const Rating = ({user}: { user: User }) => {
	return (
		<h4>
			Соц рейтинг: {" "}
			<strong className={ColorText(user.rating)}>
				{user.rating}
			</strong>
		</h4>
		)
}