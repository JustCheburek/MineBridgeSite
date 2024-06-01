// Next
import type {Metadata} from "next";
import {getCases, getDrops} from "@/services";
import {validate} from "@services/validate";
import {userModel} from "@server/models";
import {Info} from "@/types/case";
import {Types} from "mongoose";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Компоненты
import {CaseClient} from "./caseClient";
import {revalidateTag} from "next/cache";

export const metadata: Metadata = {
    title: "Кейсы | MineBridge",
    description: "Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?",
};

export default async function CasePage() {
    const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)
    const cases = await getCases()
    const drops = await getDrops()

    async function Add(
        caseId: Types.ObjectId, dropId: Types.ObjectId,
        price: number, {rarity, item, drop}: Info
    ) {
        "use server"

        if (!rarity || !item || !drop) return console.log("Как")

        await userModel.findOneAndUpdate(
            {name: user?.name},
            {
                $inc: {
                    mostiki: -price
                },
                $push: {
                    casesPurchases: {
                        Item: item._id,
                        rarity,
                        Case: caseId,
                        Drop: dropId,
                        DropItem: drop._id
                    }
                }
            }
        )

        revalidateTag("userLike")
    }

    return (
        <CaseClient cases={cases} drops={drops} user={user} Add={Add}/>
    )
}