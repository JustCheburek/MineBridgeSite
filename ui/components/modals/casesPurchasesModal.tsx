// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormInput, FormLabel} from "@components/form";

type CasesPurchasesModal = {
	modal: boolean
	setModal: setModal
}

export const CasesPurchasesModal = (
		{
			modal, setModal
		}: CasesPurchasesModal
) => {
	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Кейсы</h1>
				<Form action={() => {}}>
					<FormLabel>
						<FormInput
								name="case"
								placeholder="Кейс"
								autoComplete="case"
								required
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="price"
								type="number"
								placeholder="Цена"
								autoComplete="rating"
								required
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="drop"
								placeholder="Дроп"
								autoComplete="drop"
								required
						/>
					</FormLabel>
					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}