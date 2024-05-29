// React
import {User} from "lucia";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormInput, FormLabel} from "@components/form";

type RatingModal = {
	author: User | null
	ratingFunc?: ((formData: FormData) => void),
	modal: boolean,
	setModal: setModal
}

export const RatingModal = (
		{
			author, ratingFunc,
			modal, setModal
		}: RatingModal) => {
	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Рейтинг</h1>
				<Form action={ratingFunc}>
					<FormLabel>
						<FormInput
								name="reason"
								placeholder="Причина"
								autoComplete="reason"
								required
								maxLength={26}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="rating"
								type="number"
								placeholder="Рейтинг"
								autoComplete="rating"
								required
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="author"
								placeholder="Автор"
								autoComplete="author"
								required
								defaultValue={author?.name}
						/>
					</FormLabel>
					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}