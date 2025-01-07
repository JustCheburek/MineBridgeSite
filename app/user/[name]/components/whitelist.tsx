// React
import {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

type WhitelistSection = {
    user: User
    isMe: boolean
}

export default function WhitelistSection({user, isMe}: WhitelistSection) {
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
        </section>
    )
}