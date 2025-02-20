"use client";

import {useState} from "react";
import {OnThisPage, OnThisPageButton, OnThisPageHeading, OnThisPageLink} from "@components/sideNav";
import {Season} from "@/types/season";
import {SeasonModal} from "@modals/season";

type OnThisPageSeasons = {
	seasons: Season[]
	isAdmin: boolean
}

export function OnThisPageSeasons({seasons, isAdmin}: OnThisPageSeasons) {
	const [modal, setModal] = useState(false)

	return (
			<OnThisPage>
				<OnThisPageHeading>
					Сезоны
				</OnThisPageHeading>
				{seasons.map(season => (
						<OnThisPageLink href={`#${season.number}season`} key={season.number}>
							{season.number} сезон
						</OnThisPageLink>
				))}
				{isAdmin && <>
					<OnThisPageButton onClick={() => setModal(true)}>
						+ сезон
					</OnThisPageButton>
					<SeasonModal modal={modal} setModal={setModal}/>
				</>}
			</OnThisPage>
	)
}