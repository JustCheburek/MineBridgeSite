"use client"

import {DefaultFormBox, FormGroup, FormInput, FormLabel, FormLink} from "@components/formBox";
import {InputNameCheck} from "@components/formInputs";
import {DiscordSvg, GoogleSvg} from "@ui/SVGS";
import {useState} from "react";

import styles from "./auth.module.scss";
import {useChangeRadioState} from "@hooks/useChangeState";
import Link from "next/link";

export function AuthForm({savedName}: { savedName?: string }) {
    const [access, setAccess] = useState(false)
    const [name, setName] = useState(savedName || "")
    const [
        provider, , onChange, Check
    ] = useChangeRadioState<"google" | "discord">("discord")

    return (
        <DefaultFormBox className={styles.form}>
            <InputNameCheck name={name} setName={setName} setAccess={setAccess} autoFocus/>

            <FormGroup>
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
                        checked={Check("google")}
                        onChange={onChange}
                        value="google"
                    />
                    <GoogleSvg className={styles.google} size="1em"/>
                </FormLabel>
            </FormGroup>

            <FormLink href={`/auth/${provider}?name=${name}`} aria-disabled={!access}>
                Дальше
            </FormLink>

            <small>
                <Link
                    href="https://t.me/MineBridgeOfficial/624"
                    target="_blank"
                    className="unic_color"
                >
                    Скачать обход Discord
                </Link>
            </small>
            <small>
                *Discord - запрещённая<br/>
                в РФ платформа
            </small>
        </DefaultFormBox>
    )
}