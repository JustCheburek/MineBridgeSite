'use client'

import { Modal, type ModalAction } from '@components/modal'
import { Form } from '@components/form'
import { ResetStars } from '@services/user/stars/reset'
import { HookButton } from '../hookbutton'

export function StarsModal({ modal, setModal }: ModalAction) {
  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Сброс</h1>
      <Form action={ResetStars} onSubmit={() => setModal(false)}>
        <p>Это действие погасит звёзды у всех пользователей</p>
        <HookButton danger>Сбросить</HookButton>
      </Form>
    </Modal>
  )
}
