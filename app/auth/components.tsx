"use client"

import {Form, FormGroup, FormInput, FormLabel, FormLink} from "@components/form";
import {InputNameCheck} from "@components/formInputs";
import {DiscordSvg, GoogleSvg} from "@ui/SVGS";
import {useState} from "react";

import styles from "./auth.module.scss";
import {useChangeRadioState} from "@hooks/useChangeState";

export function AuthForm({savedName}: { savedName?: string }) {
	const [access, setAccess] = useState(false)
	const [name, setName] = useState(savedName || "")
	const [
		provider, , onChange, Check
	] = useChangeRadioState<"google" | "discord">("discord")

	return (
			<Form className={styles.form}>
				<InputNameCheck name={name} setName={setName} setAccess={setAccess} defaultName={savedName} autoFocus/>

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
						<DiscordSvg className={`color ${styles.ds}`} width="1em" height="1em"/>
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
						<GoogleSvg className={styles.google} width="1em" height="1em"/>
					</FormLabel>
				</FormGroup>

				<FormLink href={`/auth/${provider}?name=${name}`} aria-disabled={!access}>
					Дальше
				</FormLink>
			</Form>
	)
}