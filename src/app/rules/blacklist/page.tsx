// React
import type {Metadata} from "next";

// Компоненты
import {SubsectionItem, Subsections} from '@components/subsections'
import {BlacklistContent} from "@app/rules/blacklist/components";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
	title: "Выражения | Майнбридж",
	description: "Список запреток на Twitch, которые строго запрещены и у нас на сервере!",
};

export default function Blacklist() {
	return (
			<main className="blacklist">
				<MaxSize sideNav>
					<Subsections menu="Меню правил">
						<SubsectionItem href="/rules">
							Правила
						</SubsectionItem>
						<SubsectionItem href="/rules/mods">
							Моды
						</SubsectionItem>
						<SubsectionItem href="/rules/blacklist">
							Выражения
						</SubsectionItem>
					</Subsections>

					<BlacklistContent/>
				</MaxSize>
			</main>
	)
}

