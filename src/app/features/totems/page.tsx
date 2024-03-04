// React
import type {Metadata} from "next";

// Стили
import styles from "./totems.module.scss"

// Компоненты
import {Url} from "@components/button";
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {Img, ImgBox} from "@components/img";
import {GBox, GContainer} from "@components/grid";

export const metadata: Metadata = {
	title: "Тотемы | Майнбридж",
	description: "Оставьте свой след в истории!",
};

export default function Totems() {
	const totems = [
		"JustCheburek",
		"Kawa11Fox",
		"kyaVrorrEtsuJ",
		"Melissa21",
		"IIIU3A45",
		"TOXSER",
		"Pepel7",
		"JustHi_jey",
		"_rkrmv",
		"lololoshca1234",
		"KaharIRN",
		"_drdrost_",
		"ziduha_152",
		"M0vain",
		"_1drakon4ik_1",
		"fantomvip23",
		"_lakrkarBroYT",
		"Rub_Kub",
		"MarioBoi"
	]

	const max_deg = 180  // Максимальный уровень наклона (от -80 до 80)

	return (
			<main>
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "totems", displayname: "Тотемы"}]}/>
					<h1>Тотемы</h1>
					<h3 className="center_text">Версия: 2.4</h3>

					<Url href="/download/MineBridge_Totems.zip" download>
						Скачать
					</Url>

					<GContainer width={180} height={240}>
						{totems.map(totem => {
							let file = totem.toLowerCase()

							if (file.startsWith("_")) {
								file = file.substring(1)
							}

							const rotate_deg = Math.round(Math.random() * max_deg - max_deg / 2)

							return (
									<GBox key={totem} className={styles.box}>
										<Img src={`/features/totems/${file}.png`} alt="тотем" className={styles.img} pixel width={180} style={{'--_rotate': `${rotate_deg}deg`}}/>

										<p>{totem}</p>
									</GBox>
							)
						})}
					</GContainer>

					<h3 className="center_text">Тоже хотите попасть в ресурс пак?</h3>
					<Url href="https://discord.com/channels/1012334719230292048/1093724052797018133">
						Да, и что?
					</Url>
				</MaxSize>
			</main>
	)
}