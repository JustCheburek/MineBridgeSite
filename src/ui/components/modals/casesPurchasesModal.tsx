// React
import {User} from "lucia";
import {RatingChange} from "@services/user";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {useFormModalState} from "@hooks/useFormModalState";

export const CasesPurchasesModal = ({user, access, modal, setModal}: {
	user: User,
	access: boolean,
	modal: boolean,
	setModal: setModal
}) => {
	const [state, formAction, isPending] = useFormModalState(
			RatingChange,
			{
				user, access,
				setModal,
				message: "Ручная установка покупок"
			}
	)

	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Кейсы</h1>
				<p aria-live="polite" className={state.error ? "red_color" : ""}>
					{state.message}
				</p>
				<Form action={formAction}>
					<FormLabel>
						<FormInput
								name="case"
								placeholder="Кейс"
								autoComplete="case"
								required
								disabled={isPending}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="price"
								type="number"
								placeholder="Цена"
								autoComplete="rating"
								required
								disabled={isPending}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="drop"
								placeholder="Дроп"
								autoComplete="drop"
								required
								disabled={isPending}
						/>
					</FormLabel>
					<FormButton disabled={isPending}>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}