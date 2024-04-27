// Сервер
import type {User} from "lucia"
import {getUser} from "@/services";
import Link from "next/link";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Img} from "@components/img";

export async function User(param: { id?: User["id"], name?: User["name"] }) {
	const {user} = await getUser(param)

	return (
			<Link href={`/user/${user.name}`} className={styles.user_box}>
				<Img src={user.photo} alt="Ава" className="user_icon" width={50}/>
				<p>{user.name}</p>
			</Link>
	)
}