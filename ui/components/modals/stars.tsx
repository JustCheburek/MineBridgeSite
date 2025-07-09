'use client'

import { Modal, type ModalAction } from '@components/modal'
import { Form } from '@components/form'
import { stars } from '@services/user/stars'
import { HookButton } from '../hookbutton'

export function StarsModal({ modal, setModal }: ModalAction) {
  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Сброс</h1>
      <Form action={stars} onSubmit={() => setModal(false)}>
        <p>Это действие погасит звёзды у всех пользователей</p>
        <HookButton danger>Сбросить</HookButton>
      </Form>
    </Modal>
  )
}
