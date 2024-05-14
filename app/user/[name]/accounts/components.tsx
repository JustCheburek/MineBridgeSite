"use client";

// Сервер
import type {User} from "lucia";
import {parseAsBoolean, useQueryState} from "nuqs";
import {UserDelete} from "@services/user"

// Хуки
import {useFormModalState} from "@hooks/useFormModalState";

// Компоненты
import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal} from "@components/modal";

export function DeleteUser({user, access}: { user: User, access: boolean }) {
	const [modal, setModal] = useQueryState<boolean>("name", parseAsBoolean.withDefault(false))
	const [state, formAction, isPending] = useFormModalState(
			UserDelete, {user, access, setModal}
	)

	return (<>
		<Form action={() => setModal(true)}>
			<FormButton danger>
				Удалить аккаунт
			</FormButton>
		</Form>
		<Modal modal={modal} setModal={setModal}>
			<h1>Удаление</h1>
			<p>
				Ты уверен, что хочешь
			</p>
			<p>
				удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
			</p>
			<h4>Тогда введи свой <strong className="red_color">ник</strong></h4>
			<p aria-live="polite" className={state.error ? "red_color" : ""}>
				{state.message}
			</p>
			<Form action={formAction}>
				<FormLabel>
					<FormInput
							name="name"
							danger
							placeholder={user.name}
							autoComplete="off"
							required
							disabled={isPending}
					/>
				</FormLabel>
				<FormButton danger disabled={isPending}>
					Жми, жми!
				</FormButton>
			</Form>
		</Modal>
	</>)
}