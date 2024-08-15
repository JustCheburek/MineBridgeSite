// Сервер
import type {User} from "lucia"
import {getUser} from "@/services";
import Link from "next/link";
import {type PropsWithChildren, Suspense} from "react";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Img} from "@components/img";

type withId = { _id: User["_id"], name?: undefined }
type withName = { _id?: undefined, name: User["name"] }
type full = withId & withName

export async function UserBox({ _id, name, children }: PropsWithChildren<withId | withName | full>) {
	const info = await getUser({_id, name}, false).catch(console.error)

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
					{children}
				</Link>
			</Suspense>
	)
}