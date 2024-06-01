// Сервер
import type {User} from "lucia"
import {getUser} from "@/services";
import Link from "next/link";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Img} from "@components/img";
import {Suspense} from "react";

export async function User(param: { _id?: User["_id"], name?: User["name"] }) {
	const {user} = await getUser(param)

	if (!user) return

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