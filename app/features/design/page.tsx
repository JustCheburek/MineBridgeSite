// React
import type {Metadata} from "next";
import Link from "next/link";

// Стили
import styles from "./design.module.scss"

// Компоненты
import {MaxSize} from "@components/maxSize";
import {UserBox} from "@components/userBox";
import {PTitle} from "@components/post";
import {ColorsPie, Download} from "./components";
import {H1} from "@components/h1";

export const metadata: Metadata = {
	title: "Дизайн",
	description: `Дизайн разрабатывается уже с 2022 года, за это время его успели много раз измучить...`
};

export default function Design() {
	const data = [
		{title: 'Акцент', value: 10, color: '#00A7B1'},
		{title: 'Текст', value: 30, color: '#F1F1F1'},
		{title: 'Фон', value: 60, color: '#161C1F'},
	]

	return (
			<MaxSize width={900}>
				<H1 up paths={[
					{name: "features", displayname: "Фичи"},
					{name: "design", displayname: "Дизайн"}
				]}>
					Дизайн
				</H1>

				<section className="grid_center">
					<PTitle>
						<h2>
							Авторы
						</h2>
					</PTitle>
					<UserBox _id="j8bsrsdgzqa4n0c"/>
					<UserBox _id="i5mqq2js4nos1yj"/>
					<UserBox _id="t2dhhl5igw1sp43"/>
				</section>

				<section className="grid_center">
					<PTitle>
						<h2>
							Шрифт
						</h2>
					</PTitle>
					<p>
						<Link target="_blank" href="https://fonts.google.com/specimen/Montserrat" className="unic_color">
							<strong>
								Montserrat
							</strong>
						</Link> — популярный модерн шрифт
					</p>
				</section>

				<section className="grid_center">
					<PTitle>
						<h2>
							Цвета
						</h2>
					</PTitle>
					<div className={styles.pie_box}>
						<div className={styles.pie_text_box}>
							{data.map(color => (
									<div key={color.title} className={styles.pie_text}>
										<div style={{background: color.color}}
										     className={`${styles.circle} ${styles[color.title]}`}></div>
										<p>{color.title}</p>
										<span className="all_select">{color.color}</span>
										<small className={styles.percent}>{color.value}{"%"}</small>
									</div>
							))}
						</div>
						<ColorsPie data={data}/>
					</div>
				</section>

				<section className="grid_center">
					<PTitle>
						<h2>
							Лого
						</h2>
					</PTitle>
					<Download/>
				</section>
			</MaxSize>
	)
}