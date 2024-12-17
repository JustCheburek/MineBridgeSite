"use server";
import {CaseData} from "@/types/purchase";
import {GetHours, RconMB, RconVC} from "@services/console";
import {userModel} from "@server/models";
import {unstable_expireTag as expireTag} from "next/dist/server/web/spec-extension/revalidate";

export async function GetCosmetics(name: string, caseDatas: CaseData[]) {
    function wait(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Готово");
            }, ms);
        });
    }

    const client = await RconVC()

    for (const {DropItem, Item} of caseDatas) {
        if (DropItem.name !== "suffix") {
            await client.send(`lpv user ${name} permission set ultracosmetics.${DropItem.name}.${Item.name}`)
            await wait(1000)
        }
    }
}

export async function GetPrize(name: string) {
    const client = await RconMB()

    await client.send(`tw trigger health_prize ${name}`)
}

export async function GetStars(_id: string, name: string) {
    const hours = await GetHours(name)

    try {
        const client = await RconMB()

        await client.send(`scoreboard players set ${name} hours 0`)

        await userModel.findByIdAndUpdate(_id, {
            $push: {
                punishments: {
                    reason: `Часы: ${hours}`,
                    rating: hours,
                    author: "AutoHours",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            },
            $inc: {
                rating: hours
            }
        })
    } catch (e) {
        console.error(e)
    }

    expireTag(`userLike`)
}