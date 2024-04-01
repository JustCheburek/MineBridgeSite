"use client"

import {Form, FormGroup, FormInput, FormLabel} from "@components/form";
import {DiscordSvg, GoogleSvg} from "@ui/svgs";
import {useLocalStorage} from "@uidotdev/usehooks"
import Link from "next/link";

import styles from "./auth.module.scss";

export function AuthForm() {
	const [name, setName] = useLocalStorage<string>("name", "")
	const access = 4 < name.length && name.length < 20

	return (
			<Form className={styles.form}>
				<FormLabel>
					<FormInput
							placeholder="Майнкрафт никнейм"
							name="name"
							autoComplete="name"
							required
							minLength={4}
							maxLength={20}
							autoFocus
							value={name}
							onChange={e => setName(e.target.value)}
					/>
				</FormLabel>

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