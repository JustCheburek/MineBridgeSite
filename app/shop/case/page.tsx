// Next
import type {Metadata} from "next";
import {getCases, getDrops} from "@/services/shop";
import {validate} from "@/services/user/validate";
import {Info} from "@/types/case";
import {revalidateTag} from 'next/cache'
import {Case} from "@/types/case";
import {Drop} from "@/types/case";

// Компоненты
import {CaseClient} from "./caseClient";
import {AddCasePurchase, GetCosmetic} from "@/services/user/casePurchase";

export const metadata: Metadata = {
    title: "Кейсы",
    description: "Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?"
};

export default async function CasePage() {
    const {user} = await validate()
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    async function Add(
        Case: Case, Drop: Drop,
        price: number, {rarity, Item, DropItem}: Info
    ) {
        "use server"

        if (!rarity || !Item || !DropItem || !user) {
            throw new Error("Произошла ошибка при выдаче")
        }

        await AddCasePurchase(user._id, {Case, Drop, DropItem, Item, rarity}, price)
        await GetCosmetic(user.name, {DropItem, Item})

        revalidateTag("userLike")
    }

    return (
        <CaseClient Cases={Cases} Drops={Drops} user={user} Add={Add}/>
    )
}