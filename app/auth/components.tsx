"use client"

import {Form, FormGroup} from "@components/form";
import {InputNameCheck} from "@components/formInputs";
import {DiscordSvg, GoogleSvg} from "@ui/SVGS";
import Link from "next/link";
import {useState} from "react";

import styles from "./auth.module.scss";

export function AuthForm({savedName}: {savedName?: string}) {
	const [access, setAccess] = useState(false)
	const [name, setName] = useState(savedName || "")

	return (
			<Form className={styles.form}>
				<InputNameCheck name={name} setName={setName} setAccess={setAccess} defaultName={savedName} autoFocus/>

				<FormGroup>
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