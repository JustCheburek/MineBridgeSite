"use client"

import {DefaultFormBox, FormA, FormGroup, FormInput, FormLabel} from "@components/formBox";
import {InputNameCheck} from "@components/formInputs";
import {DiscordSvg, GoogleSvg, TwitchSvg} from "@ui/SVGS";
import {useState} from "react";

import styles from "./auth.module.scss";
import {useChangeRadioState} from "@hooks/useChangeState";

export function AuthForm({savedName}: { savedName?: string }) {
    const [name, setName] = useState(savedName ?? "")
    const [
        provider, , onChange, Check
    ] = useChangeRadioState<"google" | "discord" | "twitch">("google")

    return (
        <DefaultFormBox className={styles.form}>
            <InputNameCheck name={name} setName={setName} autoFocus/>

            <FormGroup>
                <FormLabel className={styles.provider}>
                    <FormInput
                        name="provider"
                        type="radio"
                        checked={Check("google")}
                        onChange={onChange}
                        value="google"
                    />
                    <GoogleSvg className={styles.google} size="1em"/>
                </FormLabel>

                <FormLabel className={styles.provider}>
                    <FormInput
                        name="provider"
                        type="radio"
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
                        checked={Check("twitch")}
                        onChange={onChange}
                        value="twitch"
                    />
                    <TwitchSvg className={`color ${styles.twitch}`} size="1em"/>
                </FormLabel>
            </FormGroup>

            <FormA href={`/auth/${provider}?name=${name}`}>
                Дальше
            </FormA>
        </DefaultFormBox>
    )
}