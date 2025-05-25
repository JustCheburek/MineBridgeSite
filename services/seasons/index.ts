"use server"

import {unstable_cache as cache} from "next/cache";
import {seasonModel} from "@db/models";
import {Season} from "@/types/season";

export const getSeasons = cache(
    async () => {
        const seasons: Season[] = JSON.parse(JSON.stringify(
            await seasonModel.find(
                {},
                {},
                {lean: true, sort: {number: -1}}
            )
        ))

        seasons.map(season => {
            season.news.sort(({createdAt: createdAt1}, {createdAt: createdAt2}) =>
                new Date(createdAt2 || "").getTime() - new Date(createdAt1 || "").getTime()
            )
            season.events.sort(({startAt: startAt1}, {startAt: startAt2}) =>
                new Date(startAt2 || "").getTime() - new Date(startAt1 || "").getTime()
            )
            return season
        })

        return seasons
    },
    ["seasons", "news", "events", "all"],
    {revalidate: 1800, tags: ["seasons", "news", "events", "all"]}
)