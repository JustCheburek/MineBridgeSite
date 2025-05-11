"use client"

import {CreatePaymentLink} from "@services/user/payment";
import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import {User} from "lucia";
import {useUrlState} from "state-in-url";

export function PaymentForm({user}: { user: User }) {
    const {
        urlState: {mostiki},
        setUrl: setMostiki
    } = useUrlState(
        {
            mostiki: 1
        }
    );

    return (
        <FormBox action={() => CreatePaymentLink(mostiki, user)}>
            <FormLabel>
                <FormInput
                    name="mostiki"
                    type="number"
                    placeholder="Мостики"
                    autoComplete="mostiki"
                    value={mostiki}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        setMostiki({mostiki: value})
                    }}
                />
            </FormLabel>

            <FormButton disabled={mostiki < 1}>
                Купить
            </FormButton>
        </FormBox>
    )
}