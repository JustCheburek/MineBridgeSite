"use client"

import styles from "../profile.module.scss";

type FormClient = {
	Func: () => void
}

export function FormClient({Func}: FormClient) {
	function ClientFunc() {
		window.open(
				"https://forms.yandex.ru/u/6638c564f47e731e00d9e6e1/",
				"_blank",
				"popup,width=750,height=600"
		)

		Func()
	}

	return (
			<form action={ClientFunc}>
				<button type="submit" className={styles.form_box}>
					<h3 className="unic_color center_text">
						❤️️ Пройдите опрос и оцените сервер ❤️️
					</h3>
				</button>
			</form>
	)
}