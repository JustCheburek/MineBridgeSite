"use client"

// React
import {User} from "lucia"
import {parseAsBoolean, useQueryState} from "nuqs";
import {WhitelistFunc} from "@services/user";

// Стили
import styles from "../profile.module.scss"

// Хуки
import {useFormModalState} from "@hooks/useFormModalState";

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

export function WhitelistSection({user, access}: { user: User, access: boolean }) {
	const [modal, setModal] = useQueryState("whitelist", parseAsBoolean.withDefault(false))
	const [state, formAction, {pending}] = useFormModalState(
			WhitelistFunc, {user, access, setModal}
	)

	if (!access) {
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
						его нажав кнопку справа от своего ника!
					</p>
					<p aria-live="polite" className={state.error ? "red_color" : ""}>
						{state.message}
					</p>
					<Form action={formAction}>
						<FormButton disabled={pending}>
							Подать заявку
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}