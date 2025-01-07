"use client"

// React
import {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

type WhitelistSection = {
    user: User
    isMe: boolean
    access: boolean
    whitelist: boolean
}

export default function WhitelistSection({user, isMe, access, whitelist}: WhitelistSection) {
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

    if (!access && !isMe) {
        return (
            <section className="center_text">
                <h2>
                    {whitelist
                        ? "Игрок в WhiteList`е!"
                        : "Игрок не в WhiteList`е!"
                    }
                </h2>
            </section>
        )
    }

    if (!whitelist) {
        return (
            <section className="center_text">
                <h2>
                    Сервер не доступен
                </h2>
                <p>
                    Попробуйте зайти на сайт позже, чтобы попасть в Whitelist
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
                <strong className="unic_color all_select">secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}</strong>
            </p>
        </section>
    )
}