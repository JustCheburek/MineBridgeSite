// React
import type {User} from "lucia";
import Link from "next/link";

// Стили
import styles from "../profile.module.scss"

// Utils
import {colorText} from "@app/utils";

// Компоненты
import {MostikiSvg} from "@ui/svgs";

export const Mostiki = ({user}: { user: User }) => (
		<h4 className={styles.box}>
			Мостики: {" "}
			<strong className={colorText(user.mostiki)}>
				{user.mostiki}
			</strong> {" "}
			<MostikiSvg/> <Link href="/shop" className="add">+</Link>
		</h4>
)