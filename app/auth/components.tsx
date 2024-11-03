"use client"

import {FormBox, FormButton, FormGroup, FormInput, FormLabel} from "@components/formBox";
import {InputNameCheck, InputNameCheckWithoutState} from "@components/formInputs";
import {DiscordSvg, GoogleSvg} from "@ui/SVGS";
import {useState} from "react";

import styles from "./auth.module.scss";
import {useChangeRadioState} from "@hooks/useChangeState";

export function AuthForm({savedName}: { savedName?: string }) {
    const [access, setAccess] = useState(false)
    const [
        provider, , onChange, Check
    ] = useChangeRadioState<"google" | "discord">("discord")

    return (
        <FormBox action={`/auth/${provider}`} className={styles.form}>
            <InputNameCheckWithoutState setAccess={setAccess} defaultName={savedName} autoFocus/>

            <FormGroup>
                <FormLabel className={styles.provider}>
                    <FormInput
                        name="provider"
                        type="radio"
                        disabled={!access}
                        checked={Check("discord")}
                        onChange={onChange}
                        value="discord"
                    />
                    <DiscordSvg className={`color ${styles.ds}`} size="1em"/>
                </FormLabel>

                <FormLabel className={styles.provider}>
                    <FormInput
                        name="provider"
                        type="radio"
                        disabled={!access}
                        checked={Check("google")}
                        onChange={onChange}
                        value="google"
                    />
                    <GoogleSvg className={styles.google} size="1em"/>
                </FormLabel>
            </FormGroup>

            <FormButton aria-disabled={!access}>
                Дальше
            </FormButton>
        </FormBox>
    )
}