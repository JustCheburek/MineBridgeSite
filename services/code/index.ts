"use server"

import {unstable_cache as cache} from "next/cache";
import {codeModel} from "@db/models";
import {Code} from "@/types/code";

export const getCode = cache(
    async (
        _id: Code["_id"]
    ): Promise<Code | null> => {
        return JSON.parse(JSON.stringify(
            await codeModel.findById(
                _id,
                {},
                {lean: true}
            )
        ))
    },
    ["code", "shop", "all"],
    {revalidate: 1200, tags: ["code", "shop", "all"]}
)

export const getCodes = cache(
    async (): Promise<Code[]> => JSON.parse(JSON.stringify(
        await codeModel.find(
            {},
            {},
            {lean: true}
        )
    )),
    ["codes", "shop", "all"],
    {revalidate: 3600, tags: ["codes", "shop", "all"]}
)