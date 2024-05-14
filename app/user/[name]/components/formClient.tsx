"use client"

import styles from "../profile.module.scss";
import {useFormState} from "react-dom";

type State = {}

type FormClient = {
	Func: () => void
}

export function FormClient({Func}: FormClient) {
	function ClientFunc(state: {}) {
		Func()

		window.open(
				"https://forms.yandex.ru/u/6638c564f47e731e00d9e6e1/",
				"_blank",
				"popup,width=750,height=600"
		)

		return state
	}

	const [_, formAction, isPending] = useFormState<State>(
			ClientFunc,
			{}
	)

	return (
			<form action={formAction}>
				<button type="submit" className={styles.form_box} disabled={isPending}>
					<h3 className="unic_color center_text">
						❤️️ Пройдите опрос и оцените сервер ❤️️
					</h3>
				</button>
			</form>
	)
}