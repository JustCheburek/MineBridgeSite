"use client";

// Компоненты
import { Modal, type setModal } from "@components/modal";
import { FormBox, FormButton, FormLink } from "@components/formBox";
import { H1 } from "@components/h1";
import type { User } from "lucia";
import { MostikiSvg } from "@ui/SVGS";
import { Buy } from "@/services/shop/buy";

type BuyModal = {
    modal: boolean
    setModal: setModal
    author: User
}

export const BuyModal = (
    {
        author,
        modal, setModal
    }: BuyModal) => {
    const fixedAmount = 100;

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>
                Межсезонье
            </H1>
            <FormBox action={() => {
                setModal(false);
                Buy(fixedAmount, author._id);
            }}>
                <p>
                    Твой баланс: {author.mostiki} <MostikiSvg />
                </p>

                <p>
                    Стоимость: {fixedAmount} <MostikiSvg />
                </p>

                <p className="red_color">
                    Ещё не работает
                </p>

                {author.mostiki >= fixedAmount
                    ? <FormButton>
                        Купить
                    </FormButton>
                    : <FormLink href="/shop/buy">
                        Пополнить баланс
                    </FormLink>
                }
            </FormBox>
        </Modal>
    )
}