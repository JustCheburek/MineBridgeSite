'use client'

import { Modal, type ModalAction } from '@components/modal'
import { Form } from '@components/form'
import { ResetWhitelist } from '@services/user/whitelist/reset'
import { HookButton } from '../hookbutton'

export function WhitelistModal({ modal, setModal }: ModalAction) {
  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Сброс</h1>
      <Form action={ResetWhitelist} onSubmit={() => setModal(false)}>
        <p>Это действие удалит проходку у всех пользователей</p>
        <HookButton danger>Сбросить</HookButton>
      </Form>
    </Modal>
  )
}
