import type {PropsWithChildren} from "react";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@/ui/components/maxSize";

export default function News(
		{
			children,
		}: PropsWithChildren
) {
	return (
			<main>
				<MaxSize sideNav>
					<Subsections menu="Меню новостей">
						<SubsectionItem href="/news">
							Новости
						</SubsectionItem>
						<SubsectionItem href="/news/events">
							Ивенты
						</SubsectionItem>
					</Subsections>

					{children}
				</MaxSize>
			</main>
	);
}