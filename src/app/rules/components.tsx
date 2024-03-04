"use client";

import type {PropsWithChildren} from "react";
import styles from "./rules.module.scss"

const LinkSvg = () => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={styles.link}>
			<path
					d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42"
					fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"
					strokeWidth="36"/>
		</svg>
)

type RulesBox = {
	name: string
	heading: string
	number: number
}

export const RulesBox = ({name, heading, number, children}: PropsWithChildren<RulesBox>) => (
		<section className={styles.container} id={name}>
			{/* Заголовок */}
			<div className={styles.heading}>
				{/* Цифра */}
				{number &&
						<a href={"#" + name} className={styles.number_box}
						   onClick={e => navigator.clipboard.writeText(e.target.toString())}>
							<LinkSvg/>
							<p className={`${styles.main_number} center_text medium-font`}>{number}</p>
						</a>
				}

				{/* Кнопка */}
				<h3 className={styles.heading_rules_text}>
					{heading}
				</h3>
			</div>

			{/* Содержание */}
			<ul id={name + "_box"} className={`${styles.box} not_indent remove_marker`}>
				{/* Rule */}
				{children}
			</ul>
		</section>
)

export const Punishment = ({punishment}: { punishment?: string | number }) => {
	let text = punishment

	if (typeof text === "number") {
		text = `-${text} рейт`
	}

	return (
			<p className={styles.punishment}>
				{text}
			</p>
	)
}

type Rule = {
	number: number
	punishment?: string | number
}

export const Rule = ({number, children, punishment}: PropsWithChildren<Rule>) => (
		<li className={styles.rule} id={number?.toString()}>
			{number &&
					<a href={"#" + number} className={styles.number}
					   onClick={e => navigator.clipboard.writeText(e.target.toString())}>
						{number}
					</a>
			}

			<div className={styles.rule_text}>
				{children}
				{punishment &&
						<Punishment punishment={punishment}/>
				}
			</div>
		</li>
)