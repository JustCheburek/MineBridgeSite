import type {PropsWithChildren} from "react";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@/ui/components/maxSize";
import {OnThisPageSeasons} from "@components/season";
import {validate} from "@services/validate";
import {getSeasons} from "@/services";
import {Season} from "@/types/season";
import {seasonModel} from "@server/models";
import {revalidateTag} from 'next/cache'

export default async function News(
		{
			children,
		}: PropsWithChildren
) {
	const {isAdmin} = await validate()
	const seasons = await getSeasons()

	async function seasonFunc(season: Season) {
		"use server";

		await seasonModel.create({
			number: season.number,
			startAt: new Date(season.startAt),
			endAt: new Date(season.endAt)
		})

		revalidateTag("seasons")
	}

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

				<OnThisPageSeasons seasons={seasons} isAdmin={isAdmin} seasonFunc={seasonFunc}/>
			</MaxSize>
	);
}