// React
import {MostikiChange} from "@services/user";
import type {User} from "lucia";

// Компоненты
import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {Modal, type setModal} from "@components/modal";
import {useFormModalState} from "@hooks/useFormModalState";

export const MostikiModal = ({user, access, modal, setModal}: { user: User, access: boolean, modal: boolean, setModal: setModal }) => {
	const [state, formAction, {pending}] = useFormModalState(
			MostikiChange,
			{
				user, access, setModal, message: "Значение суммируется"
			}
	)

	return (
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
							placeholder="5 или -5"
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
	)
}