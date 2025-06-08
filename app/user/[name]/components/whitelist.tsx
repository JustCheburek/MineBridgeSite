// React
import type { User } from "lucia"

// Стили
import styles from "../profile.module.scss"
import Link from "next/link"

export default function WhitelistSection({ user, isMe }: { user: User, isMe: boolean }) {
    if (user.rating <= -200) {
        return (
            <section className="center_text">
                <h2>
                    {isMe
                        ? "Ты в бане"
                        : "Игрок в бане"
                    }
                </h2>
            </section>
        )
    }

    if (!isMe) {
        if (!user.whitelist) {
            return (
                <section className="center_text">
                    <h2 className="red_color">
                        Игрок не купил <Link href="/shop" className="unic_color">проходку</Link>
                    </h2>
                </section>
            )
        }

        return (
            <section className="center_text">
                <h2>
                    Игрок купил <Link href="/shop" className="unic_color">проходку</Link>
                </h2>
            </section>
        )
    }

    if (!user.whitelist) {
        return (
            <section className="center_text">
                <h2>
                    Купите <Link href="/shop" className="unic_color">проходку</Link>, чтобы играть на сервере
                </h2>
            </section>
        )
    }

    return (
        <section className={`${styles.whitelist} grid_center center_text`}>
            <h2>Межсезонье</h2>
            <h4 className="unic_color medium-font">
                {process.env.NEXT_PUBLIC_VERSION} Java Edition
            </h4>
            <p>
                IP:{" "}
                <strong className="unic_color all_select">
                    secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}
                </strong>
            </p>
            <small>
                Если просит авторизацию, то<br />
                перезагрузите страницу
            </small>
        </section>
    )
}