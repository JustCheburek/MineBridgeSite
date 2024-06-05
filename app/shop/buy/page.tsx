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

export const metadata: Metadata = {
	title: "Покупка | MineBridge",
	description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
};

export default async function Component() {
	const {user: author} = await validate(cookies().get(lucia.sessionCookieName)?.value)

	if (!author) {
		return permanentRedirect("/auth")
	}

	return (
			<main className="center_text">
				<MaxSize width={550}>
					<h1>
						Покупка
					</h1>
					<p>
						Покупка происходит с помощью {" "}
						<a
								href={"#sbp"}
						>
							<strong className="unic_color">СБП</strong>
						</a>
						<br/>
						или напрямую по {" "}
						<Link
								href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
								target="_blank"
						>
							<strong className="unic_color">СБЕР</strong>
						</Link>
					</p>
					<h3>
						1 ₽ = 1 <MostikiSvg/>
					</h3>
					<br/>
					<div id="sbp" className="green_color">
						<h4 className="all_select">
							СберБанк
						</h4>
						<h4 className="all_select">
							8 914 344 8578
						</h4>
					</div>
					<Link
							href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
							target="_blank"
							style={{marginBlock: "20px"}}
					>
						<SBPSvg/>
					</Link>
				</MaxSize>
			</main>
	)
}
