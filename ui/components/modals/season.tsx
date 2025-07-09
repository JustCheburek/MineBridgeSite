'use client'

// Компоненты
import { Modal, type ModalAction } from '@components/modal'
import { Form, FormInput, FormLabel } from '@components/form'
import { useChangeDictState } from '@hooks/useChangeState'
import { Season } from '@/types/season'
import { createSeason } from '@services/seasons/create'
import { HookButton } from '../hookbutton'

export const SeasonModal = ({ modal, setModal }: ModalAction) => {
  const [season, , onSeasonChange] = useChangeDictState({} as Season)

  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Новый сезон</h1>
      <Form action={createSeason} onSubmit={() => setModal(false)}>
        <FormLabel>
          <FormInput
            type='number'
            name='number'
            placeholder='Номер сезона'
            autoComplete='season'
            value={season.number}
            onChange={onSeasonChange}
          />
        </FormLabel>
        <FormLabel>
          <FormInput
            type='date'
            name='startAt'
            placeholder='Открытие'
            value={season.startAt?.toString()}
            onChange={onSeasonChange}
          />
        </FormLabel>
        <FormLabel>
          <FormInput
            type='date'
            name='endAt'
            placeholder='Открытие'
            value={season.endAt?.toString()}
            onChange={onSeasonChange}
          />
        </FormLabel>
        <HookButton>Создать</HookButton>
      </Form>
    </Modal>
  )
}
