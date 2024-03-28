// React
import type {Metadata} from "next";
import Link from "next/link";

// Стили
import styles from "./design.module.scss"

// Компоненты
import {MaxSize} from "@components/maxSize";
import {RelativeNav} from "@components/relativeNav";
import {User} from "@components/user";
import {PTitle} from "@components/post";
import {ColorsPie} from "./components";

export const metadata: Metadata = {
	title: "Дизайн | Майнбридж",
	description: `Дизайн разрабатывается уже с 2022 года, за это время его успели много раз измучить...`,
};

export default function Design() {
	return (
			<main style={{overflow: "hidden"}}>
				<MaxSize width={900}>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "design", displayname: "Дизайн"}]}/>
					<h1>Дизайн</h1>

					<section className="grid_center">
						<PTitle>
							<h2>
								Авторы
							</h2>
						</PTitle>
						<User name="JustCheburek"/>
						<User name="VeBray"/>
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
							<ColorsPie/>
						</div>
					</section>
				</MaxSize>
			</main>
	)
}