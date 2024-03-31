"use client"

// Сервер
import {useFormState, useFormStatus} from "react-dom"
import type {User} from "lucia";
import {parseAsBoolean, useQueryState} from "nuqs";
import {useEffect} from "react";
import {NameChange} from "../service"
import {useRouter} from "next/navigation";

// Компоненты
import {Edit, Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal} from "@components/modal";

export const Name = ({user, isMe}: { user: User, isMe: boolean }) => {
	const [modal, setModal] = useQueryState<boolean>("name", parseAsBoolean.withDefault(false))
	const router = useRouter()
	const {pending} = useFormStatus()
	const [state, formAction] = useFormState(
			NameChange,
			{
				user, isMe: isMe, message: "Введите свой майнкрафт никнейм", success: false, error: false
			}
	)

	useEffect(() => {
		if (state.success) {
			setModal(false)
			router.refresh()
		}
	}, [state.success])

	return (
			<>
				<h2 className="unic_color">
					<span className="all_select">{user.name}</span>

					<Edit setModal={setModal}/>
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
									type="text"
									placeholder={user.name}
									autoComplete="name"
									required
									minLength={4}
									maxLength={20}
									disabled={pending}
							/>
						</FormLabel>
						<FormButton disabled={pending}>
							Сменить
						</FormButton>
					</Form>
				</Modal>
			</>
	)
}