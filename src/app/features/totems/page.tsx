// React
import type {Metadata} from "next";

// Стили
import "./styles/totems.scss"

// Компоненты
import {Url} from "@components/button";
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";

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

	const max_deg = 160  // Максимальный уровень наклона (от -80 до 80)

	return (
			<main className="totems">
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "totems", displayname: "Тотемы"}]}/>
					<h1>Тотемы</h1>
					<h3 className="center_text">Версия: 2.4</h3>

					<Url href="/download/MineBridge_Totems.zip" download>
						Скачать
					</Url>

					<div className="container">
						{totems.map(totem => {
							let file = totem.toLowerCase()

							if (file.startsWith("_")) {
								file = file.substring(1)
							}

							const file_path = `/media/features/totems/${file}.png`

							const rotate_deg = Math.round(Math.random() * max_deg - max_deg / 2) + "deg"

							return (
									<div className="box" key={totem}>
										<img src={file_path} style={{'--_rotate': rotate_deg}} alt="тотем" className="img_box pixel"
										     loading="lazy"/>

										<p>{totem}</p>
									</div>
							)
						})}
					</div>

					<h3 className="center_text">Тоже хотите попасть в ресурс пак?</h3>
					<Url href="https://discord.com/channels/1012334719230292048/1093724052797018133">
						Да, и что?
					</Url>
				</MaxSize>
			</main>
	)
}