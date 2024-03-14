// React
import {User} from "lucia";
import Link from "next/link";

// Стили
import styles from "../profile.module.scss"

// Utils
import {colorText} from "@app/utils";

export const Rating = ({user}: { user: User }) => (
		<h4 className={styles.box}>
			Соц рейтинг: {" "}
			<strong className={colorText(user.rating)}>
				{user.rating}
			</strong> {" "}
			<Link href="/rules" className="add">+</Link>
		</h4>
)