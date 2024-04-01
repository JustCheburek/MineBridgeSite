"use client"
// React
import {parseAsBoolean, useQueryState} from "nuqs";
import {useRouter} from "next/navigation";
import {useFormState, useFormStatus} from "react-dom";
import {MostikiChange} from "../service";
import {useEffect} from "react";
import type {User} from "lucia";
import Link from "next/link";

// Utils
import {ColorText} from "@app/utils";

// Компоненты
import {MostikiSvg} from "@ui/svgs";
import {Add, Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal} from "@components/modal";

export const Mostiki = ({user, access}: { user: User, access: boolean }) => {
	const [modal, setModal] = useQueryState<boolean>("mostiki", parseAsBoolean.withDefault(false))
	const router = useRouter()
	const {pending} = useFormStatus()
	const [state, formAction] = useFormState(
			MostikiChange,
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
			Мостики: {" "}
			<strong className={ColorText(user.mostiki)}>
				{user.mostiki}
			</strong> {" "}
			<MostikiSvg/>
			{access
					? <Add setModal={setModal}/>
					: <Link href="/shop" className="add">+</Link>
			}
		</h4>
		<Modal setModal={setModal} modal={modal}>
			<h1>Мостики</h1>
			<p aria-live="polite" className={state.error ? "red_color" : ""}>
				{state.message}
			</p>
			<Form action={formAction}>
				<FormLabel>
					<FormInput
							name="mostiki"
							type="number"
							placeholder="5 / -5"
							autoComplete="mostiki"
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