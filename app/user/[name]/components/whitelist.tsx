"use client"

// React
import {User} from "lucia"

// Стили
import styles from "../profile.module.scss"

// Компоненты
import {Button} from "@components/button";
import {Modal} from "@components/modal";
import {Form, FormButton} from "@components/form";
import {useState} from "react";

const UserWhitelisted = ({setModal}: { setModal: Function }) => (
		<section className={`${styles.whitelist} center_text`}>
			<h2>Вы в Whitelist`е</h2>
			<p>Айпи сервера - <strong className="unic_color all_select">map.minebridge.site</strong></p>
			<Button onClick={() => setModal(true)}>
				Заново
			</Button>
		</section>
)

const UserNotWhitelisted = ({setModal}: { setModal: Function }) => (
		<div className={`${styles.whitelist} center_text`}>
			<h2>Хотите поиграть на сервере?</h2>
			<Button onClick={() => setModal(true)}>
				Попасть в Whitelist
			</Button>
		</div>
)

type WhitelistSection = {
	user: User
	isMe: boolean
	isModer: boolean
	WhitelistFunc?: ((formData: FormData) => void)
}

export function WhitelistSection({user, isMe, isModer, WhitelistFunc}: WhitelistSection) {
	const [modal, setModal] = useState(false)

	if (user.rating <= -200) {
		let text = "Игрок в бане"

		if (isMe) {
			text = "Вы в бане"
		}

		return (
			<section className="center_text">
				<h2>
					{text}
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

	return (
			<>
				{user.whitelist
						? <UserWhitelisted setModal={setModal}/>
						: <UserNotWhitelisted setModal={setModal}/>
				}

				<Modal setModal={setModal} modal={modal}>
					<h1>Whitelist</h1>
					<h2>Сервер выключен</h2>
					<h4>Вайтлист не работает до открытия сезона</h4>
					<p>
						<span className="red_color">Внимание!</span><br/>
						Ваш майнкрафт никнейм - {" "}
						<strong className="unic_color all_select">{user.name}</strong>?
					</p>
					<p>
						Если <span className="red_color">нет</span>, тогда вы можете изменить<br/>
						его нажав кнопку справа от своего ника!
					</p>
					<Form action={WhitelistFunc}>
						<FormButton>
							Подать заявку
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}