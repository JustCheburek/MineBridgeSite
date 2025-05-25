"use server"

import {unstable_cache as cache} from "next/cache";
import {caseModel, dropModel} from "@db/models";
import {Case, Drop, Item, RarityType} from "@/types/case";
import {idOrName} from "@/types/idOrName";
import {notFound} from "next/navigation";

export const getCase = cache(
    async ({name, _id}: idOrName): Promise<Case> => {
        let caseM

        if (name) {
            caseM = await caseModel.findOne({name}, {}, {lean: true})
        } else {
            caseM = await caseModel.findById(_id, {}, {lean: true})
        }

        const case_: Case | null = JSON.parse(JSON.stringify(caseM))

        if (!case_) {
            console.error(`Case не найден: ${name ?? _id}`)
            notFound()
        }

        return case_
    },
    ["case", "all"],
    {revalidate: 300, tags: ["case", "all"]}
)

export const getCases = cache(
    async () => {
        const cases: Case[] = JSON.parse(JSON.stringify(
            await caseModel.find({}, {}, {lean: true})
        ))

        return cases
    },
    ["cases", "all"],
    {revalidate: 300, tags: ["cases", "all"]}
)

export const getDrop = cache(
    async ({name, _id}: idOrName): Promise<Drop> => {
        let dropM

        if (name) {
            dropM = await dropModel.findOne({name}, {}, {lean: true})
        } else {
            dropM = await dropModel.findById(_id, {}, {lean: true})
        }

        const drop: Drop | null = JSON.parse(JSON.stringify(dropM))

        if (!drop) {
            console.error(`Drop не найден: ${name ?? _id}`)
            notFound()
        }

        return drop
    },
    ["drop", "all"],
    {revalidate: 300, tags: ["drop", "all"]}
)

export const getDrops = cache(
    async () => {
        const drops: Drop[] = JSON.parse(JSON.stringify(
            await dropModel.find({}, {}, {lean: true})
        ))

        return drops
    },
    ["drops", "all"],
    {revalidate: 300, tags: ["drops", "all"]}
)

export const getDropLocal = cache(
    async (drop: Drop): Promise<Drop> => {
        const drops = await getDrops()
        const dropLocal = drops.find(({_id}) => String(_id) === String(drop._id))

        if (!dropLocal) {
            console.error(`Drop не найден: ${drop._id}`)
            notFound()
        }

        return dropLocal
    },
    ["drop", "all"],
    {revalidate: 300, tags: ["drop", "all"]}
)

export const getCaseLocal = cache(
    async (case_: Case): Promise<Case> => {
        const cases = await getCases()
        const caseLocal = cases.find(({_id}) => String(_id) === String(case_._id))

        if (!caseLocal) {
            console.error(`Case не найден: ${case_._id}`)
            notFound()
        }

        return caseLocal
    },
    ["case", "all"],
    {revalidate: 300, tags: ["case", "all"]}
)

export const getItem = cache(
    async (drop: Drop, rarity: RarityType, item: Item): Promise<Item> => {
        const dropLocal = await getDropLocal(drop)
        const itemLocal = dropLocal.items[rarity].find(({name}) => name === item.name)

        if (!itemLocal) {
            console.error(`Item не найден: ${item.name}`)
            notFound()
        }

        return itemLocal
    },
    ["item", "all"],
    {revalidate: 300, tags: ["item", "all"]}
)

export const getItems = cache(
    async (drop: Drop, rarity: RarityType): Promise<Item[]> => {
        const dropLocal = await getDropLocal(drop)
        return dropLocal.items[rarity]
    },
    ["items", "all"],
    {revalidate: 300, tags: ["items", "all"]}
) 