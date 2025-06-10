import type {PropsWithChildren} from "react";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";
import {OnThisPageSeasons} from "@components/season";
import {validate} from "@services/user/validate";
import {getSeasons} from "@services/seasons";

export default async function News(
		{
			children,
		}: PropsWithChildren
) {
	const {isAdmin} = await validate()
	const seasons = await getSeasons()

	return (
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

				<OnThisPageSeasons seasons={seasons} isAdmin={isAdmin}/>
			</MaxSize>
	);
}