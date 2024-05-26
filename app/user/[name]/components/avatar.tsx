"use client"

// Сервер
import type {User} from "lucia";
import {PhotoChange} from "@services/user";
import {useFormModalState} from "@hooks/useFormModalState";

// Компоненты
import {Img, ImgBox} from "@components/img"
import {Modal} from "@components/modal";
import {Edit, Form, FormButton, FormLabel, FormTextarea} from "@components/form";
import {useState} from "react";

export const Avatar = ({user, access}: { user: User, access: boolean }) => {
	const [modal, setModal] = useState(false)
	const [state, formAction, isPending] = useFormModalState(
			PhotoChange, {user, access, setModal}
	)

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
				<FormButton disabled={isPending}>
					Сменить
				</FormButton>
			</Form>
		</Modal>
	</>)
}