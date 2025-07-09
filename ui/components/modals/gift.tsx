'use client'

// Компоненты
import { Modal, type ModalAction } from '@components/modal'
import { Form, FormInput, FormLabel } from '@components/form'
import type { User } from 'lucia'
import { MostikiSvg } from '@ui/SVGS'
import { AuthorId, GiveGift } from '@services/user/gift'
import { useActionStateId } from '@/hooks/useActionStateId'
import { HookButton } from '@components/hookbutton'
import { ErrorMessage } from '@components/error'

type GiftModal = {
  user: User
  author: User
} & ModalAction

export function GiftModal({ user, author, modal, setModal }: GiftModal) {
  const [state, formAction] = useActionStateId<AuthorId>(GiveGift, {
    success: true,
    data: { _id: user._id, authorId: author._id },
  })

  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Перевод</h1>
      <h2>{user.name}</h2>

      <Form action={formAction} onSubmit={() => state.success && setModal(false)}>
        <p>
          Твой баланс: {author.mostiki} <MostikiSvg />
        </p>

        <FormLabel>
          <FormInput
            type='number'
            name='mostiki'
            placeholder='Мостики'
            max={author.mostiki}
            autoComplete='mostiki'
          />
        </FormLabel>

        <ErrorMessage state={state} />

        <HookButton>Перевести</HookButton>
      </Form>
    </Modal>
  )
}
