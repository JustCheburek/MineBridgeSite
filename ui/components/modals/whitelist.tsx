"use client"

import {Modal, type setModal} from "@components/modal"
import {FormBox, FormButton} from "@components/formBox"
import {H1} from "@components/h1"
import {whitelist} from "@services/user/whitelist"

interface WhitelistModalProps {
    modal: boolean
    setModal: setModal
}

export function WhitelistModal({modal, setModal}: WhitelistModalProps) {
    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>Сброс</H1>
            <FormBox action={async () => {
                setModal(false)
                await whitelist()
            }}>
                <p>Это действие удалит проходку у всех пользователей</p>
                <FormButton danger>Сбросить</FormButton>
            </FormBox>
        </Modal>
    )
} 