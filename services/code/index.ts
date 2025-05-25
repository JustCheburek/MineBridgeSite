"use server"

import {unstable_cache as cache} from "next/cache";
import {codeModel} from "@db/models";
import {Code} from "@/types/code";
import {notFound} from "next/navigation";

export const getCode = cache(
    async (code: string): Promise<Code> => {
        const codeM = await codeModel.findOne({code}, {}, {lean: true})
        const code_: Code | null = JSON.parse(JSON.stringify(codeM))

        if (!code_) {
            console.error(`Code не найден: ${code}`)
            notFound()
        }

        return code_
    },
    ["code", "all"],
    {revalidate: 300, tags: ["code", "all"]}
)

export const getCodes = cache(
    async () => {
        const codes: Code[] = JSON.parse(JSON.stringify(
            await codeModel.find({}, {}, {lean: true})
        ))

        return codes
    },
    ["codes", "all"],
    {revalidate: 300, tags: ["codes", "all"]}
) 