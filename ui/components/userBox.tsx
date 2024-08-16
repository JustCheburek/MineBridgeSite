// Сервер
import {getUser} from "@/services";
import Link from "next/link";
import {type PropsWithChildren, Suspense} from "react";
import {idOrName} from "@/types/idOrName";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Img} from "@components/img";

export async function UserBox({_id, name, children}: PropsWithChildren<idOrName>) {
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