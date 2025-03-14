// React
import type {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

export default function WhitelistSection({user, isMe, whitelist}: { user: User, isMe: boolean, whitelist: boolean }) {
    if (user.rating <= -200) {
        return (
            <section className="center_text">
                <h2>
                    {isMe
                        ? "Вы в бане"
                        : "Игрок в бане"
                    }
                </h2>
            </section>
        )
    }

    if (!isMe) return

    if (!whitelist) {
        return (
            <section className="center_text">
                <h2>
                    Сервер не доступен
                </h2>
                <p>
                    Попробуй перезагрузить страницу, чтобы попасть в Whitelist
                </p>
            </section>
        )
    }

    return (
        <section className={`${styles.whitelist} grid_center center_text`}>
            <h2>Вы в Whitelist`е</h2>
            <h4 className="unic_color medium-font">
                Java Edition
            </h4>
            <p>
                IP:{" "}
                <strong className="unic_color all_select">
                    secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}
                </strong>
            </p>
            <small>
                Зайдите на сервер и перезагрузите страницу,<br/>
                чтобы попасть в Whitelist
            </small>
        </section>
    )
}