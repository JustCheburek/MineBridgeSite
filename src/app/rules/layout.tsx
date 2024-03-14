// React
import type {PropsWithChildren} from "react";

// Компоненты
import {SubsectionItem, Subsections} from "@components/subsections";
import {MaxSize} from "@components/maxSize";

export default function RulesLayout(
		{
			children,
		}: PropsWithChildren) {
	return (
			<main>
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
					{children}
				</MaxSize>
			</main>
	);
}