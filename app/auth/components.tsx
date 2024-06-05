"use client"

import {Form, FormGroup} from "@components/form";
import {InputNameCheck} from "@components/formInputs";
import {DiscordSvg, GoogleSvg} from "@ui/SVGS";
import Link from "next/link";
import {useState} from "react";

import styles from "./auth.module.scss";

export function AuthForm({savedName}: {savedName?: string}) {
	const [name, setName] = useState(savedName || "")
	const access = 4 < name.length && name.length < 30

	return (
			<Form className={styles.form}>
				<InputNameCheck nameInput={name} setNameInput={setName} autoFocus/>

				<FormGroup className={styles.providers}>
					<Link href={`/auth/discord?name=${name}`} aria-disabled={!access} className={styles.provider}>
						<DiscordSvg className={`color ${styles.ds}`} width="1em" height="1em"/>
					</Link>

					<Link href={`/auth/google?name=${name}`} aria-disabled={!access} className={styles.provider}>
						<GoogleSvg className={styles.google} width="1em" height="1em"/>
					</Link>
				</FormGroup>
			</Form>
	)
}