"use client"

// Сервер
import type {User} from "lucia";
import {NameChange} from "@services/user"

// Хуки
import {useFormModalState} from "@hooks/useFormModalState";

// Компоненты
import {Edit, Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";

export function Name({user, access}: { user: User, access: boolean }) {
	const [modal, setModal] = useState(false)
	const [state, formAction, isPending] = useFormModalState(
			NameChange, {user, access, setModal}
	)

	return (<>
		<h2 className="unic_color">
			<span className="all_select">{user.name}</span>

			{access && <Edit setModal={setModal}/>}
		</h2>
		<Modal modal={modal} setModal={setModal}>
			<h1>Ник</h1>
			<p aria-live="polite" className={state.error ? "red_color" : ""}>
				{state.message}
			</p>
			<Form action={formAction}>
				<FormLabel>
					<FormInput
							name="name"
							placeholder={user.name}
							autoComplete="name"
							required
							minLength={4}
							maxLength={20}
							disabled={isPending}
					/>
				</FormLabel>
				<FormButton disabled={isPending}>
					Сменить
				</FormButton>
			</Form>
		</Modal>
	</>)
}