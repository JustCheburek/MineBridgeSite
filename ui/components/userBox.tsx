// Сервер
import {getUser} from "@services/user";
import Link from "next/link";
import {type PropsWithChildren, Suspense} from "react";
import {idOrNameUser} from "@/types/idOrName";
import dynamic from "next/dynamic";

// Стили
import styles from "./styles/user.module.scss";

// Компоненты
import {Skeleton} from "@components/skeleton";
const Avatar = dynamic(() => import("@components/avatar"));

export async function UserBox({_id, name, children}: PropsWithChildren<idOrNameUser>) {
    const info = await getUser({_id, name, throwNotFound: false}).catch(console.error)

    if (!info) return

    const {user} = info

    return (
        <Suspense fallback={<Skeleton width={150} height={50}/>}>
            <Link href={`/user/${user.name}`} className={styles.user_box}>
                <Avatar src={user.photo} width={50}/>
                <p>{user.name}</p>
                {children}
            </Link>
        </Suspense>
    )
}