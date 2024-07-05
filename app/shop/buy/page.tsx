// Сервер
import type {Metadata} from "next";
import {permanentRedirect} from "next/navigation";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Компоненты
import {MostikiSvg, SBPSvg} from "@ui/SVGS";
import {MaxSize} from "@components/maxSize";
import Link from "next/link";
import {PBox, PText, PTitle} from "@components/post";

export const metadata: Metadata = {
	title: "Покупка | MineBridge",
	description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
};

export default async function Component() {
	const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	if (!user) {
		return permanentRedirect("/auth")
	}

	return (
			<MaxSize width={550} className="grid_center center_text">
				<h1>
					Покупка
				</h1>
				<h3>
					1 ₽ = 1 <MostikiSvg/>
				</h3>

				<h4>
					Для покупки позовите {" "}
					<Link
							href="https://discord.gg/f95V9Rezqy"
							className="unic_color medium-font" target="_blank"
					>
						админа
					</Link>
				</h4>

				<PBox>
					<PTitle>
						<h2 className="unic_color">СБП</h2>
					</PTitle>
					<PText className="center_text">
						<h4 className="all_select green_color">
							СберБанк
						</h4>
						<h4 className="all_select">
							8 914 344 8578
						</h4>
					</PText>
				</PBox>

				<PBox>
					<PTitle>
						<Link
								href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
								target="_blank" className="unic_color"
						>
							<h2>СБЕР</h2>
						</Link>
					</PTitle>
					<PText>
						<Link
								href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
								target="_blank"
						>
							<SBPSvg/>
						</Link>
					</PText>
				</PBox>
			</MaxSize>
	)
}
