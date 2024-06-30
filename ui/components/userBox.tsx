// Сервер
import type {User} from "lucia"
import {getUser} from "@/services";
import Link from "next/link";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Img} from "@components/img";
import {Suspense} from "react";

export async function UserBox(param: { _id?: User["_id"], name?: User["name"] }) {
	const info = await getUser(param, false).catch(console.error)

	if (!info) return

	const {user} = info

	return (
			<Suspense fallback={<p>Загрузка...</p>}>
				<Link href={`/user/${user.name}`} className={styles.user_box}>
					<Img
							src={user.photo} alt="Ава"
							className="user_icon" width={50}
					/>
					<p>{user.name}</p>
				</Link>
			</Suspense>
	)
}