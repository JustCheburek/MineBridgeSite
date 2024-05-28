"use client";

// Сервер
import type {User} from "lucia";
import {UserDelete} from "@services/user"

// Хуки
import {useFormModalState} from "@hooks/useFormModalState";

// Компоненты
import {Form, FormButton, FormInput, FormLabel, FormTextarea} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";

export function DeleteUser({user, access}: { user: User, access: boolean }) {
	const [modal, setModal] = useState(false)
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

type ChangeParam = {
	name: string
	photo: string
	access: boolean
	Change?: string | ((formData: FormData) => void)
}

export function ChangeParam({name, photo, access, Change}: ChangeParam) {
	if (!access) return

	return (
			<Form action={Change}>
				<FormLabel>
					<FormInput
							placeholder="Майнкрафт никнейм"
							name="name"
							autoComplete="name"
							required
							minLength={4}
							maxLength={20}
							defaultValue={name}
					/>
				</FormLabel>
				<FormLabel>
					<FormTextarea
							name="photo"
							placeholder="Ссылка на аватарку"
							autoComplete="photo"
							required
							maxLength={200}
							defaultValue={photo}
					/>
				</FormLabel>
				<FormButton>
					Сохранить
				</FormButton>
			</Form>
	)
}