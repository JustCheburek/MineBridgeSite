"use client";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import {H1} from "@components/h1";
import type {User} from "lucia";
import {useState} from "react";
import {MostikiSvg} from "@ui/SVGS";
import {GiveGift} from "@services/user/gift";

type GiftModal = {
    modal: boolean
    setModal: setModal
    user: User
    author: User
}

export const GiftModal = (
    {
        user, author,
        modal, setModal
    }: GiftModal) => {
    const [mostiki, setMostiki] = useState<number>(1)
    /*const [
        type, , onChange, Check
    ] = useChangeRadioState<"promocode" | "give">("give")*/

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>
                Подарок
            </H1>
            <h2>
                {user.name}
            </h2>
            <FormBox action={() => {
                if (!mostiki || mostiki <= 0 || mostiki > author.mostiki) return
                setModal(false)

                GiveGift(mostiki, user._id, author._id)

                /*if (type === "give") {
                    return
                } else if (type === "promocode") {

                }*/
            }}>
                <FormLabel>
                    <FormInput
                        type="number"
                        name="number"
                        placeholder="Мостики"
                        min={1}
                        max={author.mostiki}
                        autoComplete="mostiki"
                        value={mostiki}
                        onChange={e => setMostiki(Number(e.target.value))}
                    />
                </FormLabel>
               {/* <FormGroup>
                    <FormLabel>
                        <FormInput
                            type="radio"
                            name="type"
                            checked={Check("give")}
                            onChange={onChange}
                            value="give"
                        />
                        Сразу
                    </FormLabel>

                    <FormLabel>
                        <FormInput
                            type="radio"
                            name="type"
                            checked={Check("promocode")}
                            onChange={onChange}
                            value="promocode"
                        />
                        Промокод
                    </FormLabel>
                </FormGroup>*/}

                <div>
                    <p>
                        Ваш баланс:
                    </p>
                    <p>
                        до {author.mostiki} <MostikiSvg/>
                    </p>
                    <p>
                        после {author.mostiki - (mostiki || 0)} <MostikiSvg/>
                    </p>
                </div>

                <FormButton disabled={!mostiki || mostiki <= 0 || mostiki > author.mostiki}>
                    Добавить
                </FormButton>
            </FormBox>
        </Modal>
    )
}