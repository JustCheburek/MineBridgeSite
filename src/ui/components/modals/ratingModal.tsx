// React
import {User} from "lucia";
import {RatingChange} from "@services/user";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {useFormModalState} from "@hooks/useFormModalState";

export const RatingModal = ({user, access, modal, setModal}: {
	user: User,
	access: boolean,
	modal: boolean,
	setModal: setModal
}) => {
	const [state, formAction, {pending}] = useFormModalState(
			RatingChange,
			{
				user, access,
				setModal,
				message: "Значение суммируется"
			}
	)

	return (
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
								defaultValue={user.name}
						/>
					</FormLabel>
					<FormButton disabled={pending}>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}