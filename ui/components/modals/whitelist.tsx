'use client'

import { Modal, type setModal } from '@components/modal'
import { Form } from '@components/form'
import { H1 } from '@components/h1'
import { whitelist } from '@services/user/whitelist'
import { HookButton } from '../hookbutton'

interface WhitelistModalProps {
  modal: boolean
  setModal: setModal
}

export function WhitelistModal({ modal, setModal }: WhitelistModalProps) {
  return (
    <Modal setModal={setModal} modal={modal}>
      <h1>Сброс</h1>
      <Form action={whitelist} onSubmit={() => setModal(false)}>
        <p>Это действие удалит проходку у всех пользователей</p>
        <HookButton danger>Сбросить</HookButton>
      </Form>
    </Modal>
  )
}
