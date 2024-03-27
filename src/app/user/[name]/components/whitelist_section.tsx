"use client"

// React
import {User} from "lucia";
import {useState} from "react";

// Стили
import styles from "../profile.module.scss"

// Компоненты
import {Button} from "@components/button";
import {Modal} from "@components/modal";
import {Form, FormButton} from "@components/form";

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

export function WhitelistSection({user, isMe, func}: { user: User, isMe: boolean, func?: ((formData: FormData) => void) }) {
	const [modal, setModal] = useState(false)

	if (!isMe) {
		return (
				<section className={`${styles.whitelist} center_text`}>
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
					<p>
						<span className="red_color">Внимание!</span><br/>
						Ваш майнкрафт никнейм - {" "}
						<strong className="unic_color all_select">{user.name}</strong>?
					</p>
					<p>
						Если <span className="red_color">нет</span>, тогда вы можете изменить<br/>
						его в аккаунтах!
					</p>
					<Form className="form" action={func}>
						<FormButton>
							Подать заявку
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}