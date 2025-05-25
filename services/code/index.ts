"use server"

import {unstable_cache as cache} from "next/cache";
import {codeModel} from "@db/models";
import {Code} from "@/types/code";
import {notFound} from "next/navigation";

export const getCode = cache(
    async (
        _id: Code["_id"]
    ) => {
        const code: Code | null = JSON.parse(JSON.stringify(
            await codeModel.findById(
                _id,
                {},
                {lean: true}
            )
        ))

        if (!code) {
            console.error(`Code не найден: ${String(_id)}`)
            notFound()
        }

        return code
    },
    ["code", "shop", "all"],
    {revalidate: 1200, tags: ["code", "shop", "all"]}
)

export const getCodes = cache(
    async () => JSON.parse(JSON.stringify(
        await codeModel.find(
            {},
            {},
            {lean: true}
        )
    )),
    ["codes", "shop", "all"],
    {revalidate: 3600, tags: ["codes", "shop", "all"]}
)