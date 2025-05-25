import {Typing} from "./typing";
import {Url} from "@components/button";
import {getUsersL} from "@services/user";
import {Skeleton} from "@components/skeleton";

// Стили
import styles from "./styles/info.module.scss"
import {Suspense} from "react";

async function AllUsers() {
    const usersL = await getUsersL()

    return (
        <div className={styles.small}>
            <small className="light_gray_color">
                Нас уже <Suspense fallback={<Skeleton width="3em" height="1em"/>}>
                {usersL}
            </Suspense>, присоединяйся и ты,<br/>
                Стань участником истории или же создай свою
            </small>
        </div>
    )
}

const InfoSection = () => (
    <section className={`center_text ${styles.section}`}>
        <article className="for_pc">
            <h1 className={styles.h1}>
                <span className="unic_color">MineBridge</span>
                <Typing/>
            </h1>

            <Url href="/auth">
                Влететь на сервер
            </Url>

            <p>
                {process.env.NEXT_PUBLIC_VERSION} · Minecraft: Java Edition · Лицензия не обязательна
            </p>

            <AllUsers/>
        </article>
        <article className="for_mobile">
            <h1 className={styles.for_bigger}>
                MineBridge
            </h1>
            <h1 className={styles.for_smaller}>
                Mine<br/>
                Bridge
            </h1>

            <p>
                Самый крутой майнкрафт сервер<br/>
                без приватов и команд
            </p>

            <Url href="/auth">
                Влететь на сервер
            </Url>

            <p>{process.env.NEXT_PUBLIC_VERSION}</p>
            <p>Minecraft: Java Edition</p>
            <p>Лицензия не обязательна</p>

            <AllUsers/>
        </article>
    </section>
)

export default InfoSection