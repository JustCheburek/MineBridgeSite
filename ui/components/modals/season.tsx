"use client";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {useChangeDictState} from "@hooks/useChangeState";
import {Season} from "@/types/season";

type SeasonModal = {
	seasonFunc: Function
	modal: boolean
	setModal: setModal
}

export const SeasonModal = (
		{
			seasonFunc,
			modal, setModal
		}: SeasonModal) => {
	const [season,, onSeasonChange] = useChangeDictState({} as Season)

	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Новый сезон</h1>
				<Form action={() => {
					seasonFunc(season)
					setModal(false)
				}}>
					<FormLabel>
						<FormInput
								type="number"
								name="number"
								placeholder="Номер сезона"
								autoComplete="season"
								value={season.number}
								onChange={onSeasonChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								type="date"
								name="startAt"
								placeholder="Открытие"
								value={season.startAt?.toString()}
								onChange={onSeasonChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								type="date"
								name="endAt"
								placeholder="Открытие"
								value={season.endAt?.toString()}
								onChange={onSeasonChange}
						/>
					</FormLabel>
					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}