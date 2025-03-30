"use client"

import {MostikiSvg} from "@ui/SVGS";
import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import {User} from "lucia";
import {CreateCode} from "@services/code/create";
import {useState} from "react";
import {UseCode} from "@services/code/use";

export const Create = ({user}: { user: User }) => {
    const [mostiki, setMostiki] = useState<number>(1)

    return (
        <FormBox action={() => CreateCode(mostiki, user._id)}>
            <p>
                Твой баланс: {user?.mostiki} <MostikiSvg/>
            </p>

            <FormLabel>
                <FormInput
                    name="mostiki"
                    type="number"
                    placeholder="Мостики"
                    min={1}
                    max={user.mostiki}
                    autoComplete="mostiki"
                    value={mostiki}
                    onChange={e => setMostiki(Number(e.target.value))}
                />
            </FormLabel>

            <FormButton disabled={!mostiki || mostiki <= 0 || mostiki > user.mostiki}>
                Сгенерировать
            </FormButton>
        </FormBox>
    )
}

export const Use = ({user}: { user: User }) => {
    const [code, setCode] = useState<string>("")

    return (
        <FormBox
            action={() => UseCode(code, user._id)}
        >
            <FormLabel>
                <FormInput
                    placeholder="Код"
                    name="code"
                    autoComplete="code"
                    required
                    value={code}
                    onChange={e => setCode(e.target.value)}
                />
            </FormLabel>
            <FormButton disabled={!code}>
                Использовать
            </FormButton>
        </FormBox>
    )
}