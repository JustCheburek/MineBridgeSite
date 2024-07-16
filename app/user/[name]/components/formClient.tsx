"use client"

import styles from "../profile.module.scss";

type FormClient = {
	Func: () => void
}

export function FormClient({Func}: FormClient) {
	return (
			<form action={() => Func}>
				<button type="submit" className={styles.form_box}>
					<h3 className="unic_color center_text">
						❤️️ Пройдите опрос и оцените сервер ❤️️
					</h3>
				</button>
			</form>
	)
}