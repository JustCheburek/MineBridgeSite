"use client"

// React
import {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

// Компоненты
import {Button} from "@components/button";
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton} from "@components/form";
import {useState} from "react";
import {H1} from "@components/h1";
import {BEDROCK_IP, JAVA_IP} from "@/const";
import {AddWhitelist} from "@services/user";

const UserWhitelisted = ({setModal}: { setModal: setModal }) => (
    <section className={`${styles.whitelist} grid_center`}>
        <h2 className="center_text">Вы в Whitelist`е</h2>

        {/* todo: гайд */}
        <ul>
            <li>
                <h4>Java Edition:</h4>
                <strong className="unic_color all_select">{JAVA_IP}:25565</strong>
            </li>
            <li>
                <h4>Bedrock Edition:</h4>
                <strong className="unic_color all_select">{BEDROCK_IP}:19132</strong>
            </li>
        </ul>
        <p>Когда-нибудь здесь появится гайд по заходу на bedrock :)</p>
        <Button onClick={() => setModal(true)}>
            Заново
        </Button>
    </section>
)

const UserNotWhitelisted = ({setModal}: { setModal: setModal }) => (
    <section className={`${styles.whitelist} center_text`}>
        <h2>Хотите поиграть на сервере?</h2>
        <Button onClick={() => setModal(true)}>
            Попасть в Whitelist
        </Button>
    </section>
)

type WhitelistSection = {
    user: User
    isMe: boolean
    isModer: boolean
}

export function WhitelistSection({user, isMe, isModer}: WhitelistSection) {
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

    if (!isModer && !isMe) {
        return (
            <section className="center_text">
                <h2>
                    {user.whitelist
                        ? "Этот игрок в Whitelist`е!"
                        : "Этот игрок не в Whitelist`е!"
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
            <Form action={() => {
                AddWhitelist(user._id, user.name)
                setModal(false)
            }}>
                <FormButton>
                    Попасть в whitelist
                </FormButton>
            </Form>
        </Modal>
    </>)
}