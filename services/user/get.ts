"use server";
import {CaseData} from "@/types/purchase";
import {RconMB, RconVC} from "@server/console";

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
            await client.run(`lpv user ${name} permission set ultracosmetics.${DropItem.name}.${Item.name}`)
            await wait(1000)
        }
    }
}

export async function GetPrize(name: string) {
    const client = await RconMB()

    await client.run(`tw trigger health_prize ${name}`)
}