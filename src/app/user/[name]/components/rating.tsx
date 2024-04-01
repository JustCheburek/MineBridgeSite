"use client"
// React
import {User} from "lucia";
import Link from "next/link";
import {parseAsBoolean, useQueryState} from "nuqs";
import {useRouter} from "next/navigation";
import {useFormState, useFormStatus} from "react-dom";
import {RatingChange} from "../service";
import {useEffect} from "react";

// Utils
import {ColorText} from "@app/utils";

// Компоненты
import {Modal} from "@components/modal";
import {Add, Form, FormButton, FormInput, FormLabel} from "@components/form";

export const Rating = ({user, access}: { user: User, access: boolean }) => {
	const [modal, setModal] = useQueryState<boolean>("rating", parseAsBoolean.withDefault(false))
	const router = useRouter()
	const {pending} = useFormStatus()
	const [state, formAction] = useFormState(
			RatingChange,
			{
				user, access, message: "Значение суммируется", success: false, error: false
			}
	)

	useEffect(() => {
		if (state.success) {
			setModal(false)
			router.refresh()
		}
	}, [state])

	return (<>
		<h4>
			Соц рейтинг: {" "}
			<strong className={ColorText(user.rating)}>
				{user.rating}
			</strong> {" "}
			{access
					? <Add setModal={setModal}/>
					: <Link href="/rules" className="add">+</Link>
			}
		</h4>
		<Modal setModal={setModal} modal={modal}>
			<h1>Рейтинг</h1>
			<p aria-live="polite" className={state.error ? "red_color" : ""}>
				{state.message}
			</p>
			<Form action={formAction}>
				<FormLabel>
					<FormInput
							name="reason"
							placeholder="Причина"
							autoComplete="reason"
							required
							maxLength={26}
							disabled={pending}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							name="rating"
							type="number"
							placeholder="Рейтинг"
							autoComplete="rating"
							required
							disabled={pending}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							name="author"
							placeholder="Автор"
							autoComplete="author"
							required
							disabled={pending}
					/>
				</FormLabel>
				<FormButton disabled={pending}>
					Добавить
				</FormButton>
			</Form>
		</Modal>
	</>)
}