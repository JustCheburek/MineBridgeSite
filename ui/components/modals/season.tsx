"use client";

// Компоненты
import { Modal, type setModal } from "@components/modal";
import { Form, FormInput, FormLabel } from "@components/form";
import { useChangeDictState } from "@hooks/useChangeState";
import { Season } from "@/types/season";
import { H1 } from "@components/h1";
import { createSeason } from "@services/seasons/create";
import { HookButton } from "../hookbutton";

type SeasonModal = {
    modal: boolean
    setModal: setModal
}

export const SeasonModal = (
    {
        modal, setModal
    }: SeasonModal) => {
    const [season, , onSeasonChange] = useChangeDictState({} as Season)

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>Новый сезон</H1>
            <Form action={createSeason} onSubmit={() => setModal(false)}>
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
                <HookButton>
                    Создать
                </HookButton>
            </Form>
        </Modal>
    )
}