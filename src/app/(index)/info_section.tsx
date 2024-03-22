"use client"

import {TypeAnimation} from "react-type-animation";
import {Url} from "@components/button";

// Стили
import styles from "./styles/info.module.scss"

export function InfoSection() {
	return (
			<section className={`center_text ${styles.section}`}>
				<article className="for_pc">
					<h1 className={styles.h1}>
						<span className="unic_color">MineBridge</span>
						<TypeAnimation
								sequence={[
									" — полу-ванильный майнкрафт сервер", 3500,
									" — лучший азиатский сервер", 3500,
									" — самый уникальный сервер", 3500,
									" — сервер без приватов и команд", 3500,
									" — самый абобовский сервер", 3500,
								]}
								repeat={Infinity}
								cursor={false}
						/>
					</h1>

					<Url href="/auth">
						Влететь на сервер
					</Url>

					<p>
						1.20+ · Minecraft: Java Edition · Лицензия не обязательна
					</p>
				</article>
				<article className="for_mobile">
					<h1 className={styles.for_bigger}>
						MineBridge
					</h1>
					<h1 className={styles.for_smaller}>
						Mine<br/>
						Bridge
					</h1>

					<p>
						Самый крутой майнкрафт сервер<br/>
						без приватов и команд
					</p>

					<Url href="/auth">
						Влететь на сервер
					</Url>

					<p>1.20+</p>
					<p>Minecraft: Java Edition</p>
					<p>Лицензия не обязательна</p>
				</article>
			</section>
	)
}