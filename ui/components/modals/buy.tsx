'use client'

// Компоненты
import { Modal, type ModalAction } from '@components/modal'
import { Form, FormLink } from '@components/form'
import { HookButton } from '@components/hookbutton'
import type { User } from 'lucia'
import { MostikiSvg } from '@ui/SVGS'
import { Buy } from '@services/shop/buy'
import { ErrorMessage } from '@components/error'
import { PREMBCOST } from '@/const'
import { useActionStateId } from '@/hooks/useActionStateId'

type BuyModal = {
  author: User
} & ModalAction

export const BuyModal = ({ author, modal, setModal }: BuyModal) => {
  const [state, formAction] = useActionStateId(Buy, { success: true, data: { _id: author._id } })

  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Межсезонье</h1>
      <Form action={formAction} onSubmit={() => state.success && setModal(false)}>
        <p>
          Твой баланс: {author.mostiki} <MostikiSvg />
        </p>

        <p>
          Стоимость: {PREMBCOST} <MostikiSvg />
        </p>

        <ErrorMessage state={state} />

        {author.mostiki >= PREMBCOST ? (
          <HookButton>Купить</HookButton>
        ) : (
          <FormLink href='/shop/buy'>Пополнить баланс</FormLink>
        )}
      </Form>
    </Modal>
  )
}
