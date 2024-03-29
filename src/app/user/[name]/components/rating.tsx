// React
import {User} from "lucia";
import Link from "next/link";

// Utils
import {ColorText} from "@app/utils";

export const Rating = ({user}: { user: User }) => (
		<h4>
			Соц рейтинг: {" "}
			<strong className={ColorText(user.rating)}>
				{user.rating}
			</strong> {" "}
			<Link href="/rules" className="add">+</Link>
		</h4>
)