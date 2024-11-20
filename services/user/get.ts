"use server";
import {CaseData} from "@/types/purchase";
import {RconVC} from "@server/console";

export async function GetAll(name: string, caseDatas: CaseData[]) {
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