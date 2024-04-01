"use client"

// Сервер
import {useFormState, useFormStatus} from "react-dom"
import type {User} from "lucia";
import {parseAsBoolean, useQueryState} from "nuqs";
import {PhotoChange} from "../service";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

// Компоненты
import {Img, ImgBox} from "@components/img"
import {Modal} from "@components/modal";
import {Edit, Form, FormButton, FormLabel, FormTextarea} from "@components/form";

export const Avatar = ({user, access}: { user: User, access: boolean }) => {
	const [modal, setModal] = useQueryState<boolean>("photo", parseAsBoolean.withDefault(false))
	const router = useRouter()
	const {pending} = useFormStatus()
	const [state, formAction] = useFormState(
			PhotoChange,
			{
				user, access, message: "Введите ссылку на фотку", success: false, error: false
			}
	)

	useEffect(() => {
		if (state.success) {
			setModal(false)
			router.refresh()
		}
	}, [state.success])

	return (<>
		<ImgBox>
			<Img src={user.photo} alt="Ава" className="user_icon" width={180}/>
			{access && <Edit setModal={setModal}/>}
		</ImgBox>
		<Modal modal={modal} setModal={setModal}>
			<h1>Аватарка</h1>
			<p aria-live="polite" className={state.error ? "red_color" : ""}>
				{state.message}
			</p>
			<Form action={formAction}>
				<FormLabel>
					<FormTextarea
							name="photo"
							placeholder="Ссылка на аватарку"
							autoComplete="photo"
							required
							maxLength={200}
							defaultValue={user.photo}
					/>
				</FormLabel>
				<FormButton disabled={pending}>
					Сменить
				</FormButton>
			</Form>
		</Modal>
	</>)
}