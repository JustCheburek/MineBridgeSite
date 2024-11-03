"use client";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import {useChangeDictState} from "@hooks/useChangeState";
import {Season} from "@/types/season";
import {H1} from "@components/h1";

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
				<H1>Новый сезон</H1>
				<FormBox action={() => {
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
				</FormBox>
			</Modal>
	)
}