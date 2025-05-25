"use server"

import {unstable_cache as cache} from "next/cache";
import {seasonModel} from "@db/models";
import {Season} from "@/types/season";

export const getSeasons = cache(
    async () => {
        const seasons: Season[] = JSON.parse(JSON.stringify(
            await seasonModel.find({}, {}, {lean: true})
        ))

        return seasons
    },
    ["seasons", "all"],
    {revalidate: 300, tags: ["seasons", "all"]}
) 