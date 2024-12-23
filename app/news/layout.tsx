import type {PropsWithChildren} from "react";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@/ui/components/maxSize";
import {OnThisPageSeasons} from "@components/season";
import {validate} from "@services/validate";
import {getSeasons} from "@/services";
import {Season} from "@/types/season";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {seasonModel} from "@server/models";
import {unstable_expireTag as expireTag} from "next/cache";

export default async function News(
		{
			children,
		}: PropsWithChildren
) {
	const cookiesStore = await cookies()
	const {isAdmin} = await validate()
	const seasons = await getSeasons()

	async function seasonFunc(season: Season) {
		"use server";

		await seasonModel.create({
			number: season.number,
			startAt: new Date(season.startAt),
			endAt: new Date(season.endAt)
		})

		expireTag("seasons")
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