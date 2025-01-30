// Next
import type {Metadata} from "next";
import {getCases, getDrops} from "@/services";
import {validate} from "@services/validate";
import {userModel} from "@server/models";
import {Info} from "@/types/case";
import {revalidateTag} from 'next/cache'
import {Case} from "@/types/case";
import {Drop} from "@/types/case";

// Компоненты
import {CaseClient} from "./caseClient";
import {RconVC} from "@services/console";

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

        try {
            if (DropItem.give) {
                const client = await RconVC()
                await client.send(`lpv user ${user.name} permission set ${DropItem.give}.${DropItem.name}.${Item.name}`)
            }
        } catch (e) {
            console.log(e)
        }

        await userModel.findOneAndUpdate(
            {name: user?.name},
            {
                $inc: {
                    mostiki: -price
                },
                $push: {
                    casesPurchases: {
                        Item: Item._id,
                        rarity,
                        Case: Case._id,
                        Drop: Drop._id,
                        DropItem: DropItem._id
                    }
                }
            }
        )

        revalidateTag("userLike")
    }

    return (
        <CaseClient Cases={Cases} Drops={Drops} user={user} Add={Add}/>
    )
}