"use client"

import {FormBox, FormButton, FormGroup, FormInput, FormLabel} from "@components/formBox";
import {useChangeRadioState} from "@hooks/useChangeState";

export type Who = "person" | "all"

export function SendEmailForm() {
    const [
        , , onChange, Check
    ] = useChangeRadioState<Who>("person")

    //  action={SendEmail}

    return (
        <FormBox action="">
            <FormGroup>
                <FormLabel>
                    <FormInput
                        type="radio"
                        name="who"
                        checked={Check("person")}
                        onChange={onChange}
                        value="person"
                    />
                    Человеку
                </FormLabel>

                <FormLabel>
                    <FormInput
                        type="radio"
                        name="who"
                        checked={Check("all")}
                        onChange={onChange}
                        value="all"
                    />
                    Всем
                </FormLabel>
            </FormGroup>
            <FormLabel>
                <FormInput
                    name="name"
                    placeholder="Кому"
                    disabled={!Check("person")}
                    required
                />
            </FormLabel>
            <FormButton>
                Отправить
            </FormButton>
        </FormBox>
    )
}