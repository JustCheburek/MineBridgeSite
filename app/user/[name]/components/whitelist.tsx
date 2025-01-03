"use client"

// React
import {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

// Компоненты
import {Button} from "@components/button";
import {Modal, type setModal} from "@components/modal";
import {FormBox, FormButton} from "@components/formBox";
import {useState} from "react";
import {H1} from "@components/h1";
import {AddWhitelist} from "@services/user";
import Link from "next/link";

const UserWhitelisted = ({setModal}: { setModal: setModal }) => (
    <section className={`${styles.whitelist} grid_center center_text`}>
        <h2>Вы в Whitelist`е</h2>

        <Link href="/features/guides/auth">
            <h4 className="unic_color medium-font">
                Java Edition
            </h4>
        </Link>
        <p>
            IP:{" "}
            <strong className="unic_color all_select">secure.{process.env.NEXT_PUBLIC_EN_DOMAIN}</strong>
        </p>

        <FormBox action="">
            <FormButton onClick={() => setModal(true)}>
                Заново
            </FormButton>
        </FormBox>
    </section>
)

const UserNotWhitelisted = ({setModal}: { setModal: setModal }) => (
    <section className={`${styles.whitelist} center_text`}>
        <h2>Хотите поиграть на сервере?</h2>
        <Button onClick={() => setModal(true)}>
            Попасть в WhiteList
        </Button>
    </section>
)

type WhitelistSection = {
    user: User
    isMe: boolean
    isHelper: boolean
}

export default function WhitelistSection({user, isMe, isHelper}: WhitelistSection) {
    const [modal, setModal] = useState(false)

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

    if (!isHelper && !isMe) {
        return (
            <section className="center_text">
                <h2>
                    {user.whitelist
                        ? "Этот игрок в WhiteList`е!"
                        : "Этот игрок не в WhiteList`е!"
                    }
                </h2>
            </section>
        )
    }

    return (<>
        {user.whitelist
            ? <UserWhitelisted setModal={setModal}/>
            : <UserNotWhitelisted setModal={setModal}/>
        }

        <Modal setModal={setModal} modal={modal}>
            <H1>Whitelist</H1>
            <p>
                <span className="red_color">Внимание!</span><br/>
                Ваш майнкрафт никнейм - {" "}
                <strong className="unic_color all_select">{user.name}</strong>?
            </p>
            <p>
                Если <span className="red_color">нет</span>, тогда вы можете изменить<br/>
                его во вкладке в аккаунтах!
            </p>
            <FormBox action={() => {
                AddWhitelist(user._id, user.name)
            }}>
                <FormButton onClick={() => setModal(false)}>
                    Попасть в WhiteList
                </FormButton>
            </FormBox>
        </Modal>
    </>)
}