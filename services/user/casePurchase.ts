"use server";

import {CaseData} from "@/types/purchase";
import {RconVC} from "@services/console";
import {userModel} from "@db/models";
import {revalidateTag} from "next/cache";
import {Types} from "mongoose";
import {Drop, Item} from "@/types/case";

type DropAndItem = {
    DropItem: Drop
    Item: Item
}

export async function GetCosmetic(name: string, {DropItem, Item}: DropAndItem) {
    if (!DropItem.give) return

    const client = await RconVC()

    await client.send(`lpv user ${name} permission set ${DropItem.give}.${DropItem.name}.${Item.name}`)

    client.disconnect()
}

export async function GetCosmetics(name: string, caseDatas: Partial<DropAndItem>[]) {
    function wait(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Готово");
            }, ms);
        });
    }

    const client = await RconVC()

    for (const {DropItem, Item} of caseDatas) {
        if (DropItem?.name && Item?.name && DropItem?.give) {
            await client.send(`lpv user ${name} permission set ${DropItem.give}.${DropItem.name}.${Item.name}`)
            await wait(1000)
        }
    }

    client.disconnect()
}

export async function AddCasePurchase(_id: string, CaseData: CaseData) {
    const user = await userModel.findById(_id)
    if (!user) {
        throw new Error(`Пользователь не найден`)
    }

    user.casesPurchases.push({
        ...CaseData,
        Case: CaseData.Case._id,
        Drop: CaseData.Drop._id,
        DropItem: CaseData.DropItem._id,
        Item: CaseData.Item._id
    })

    await user.save()

    revalidateTag("userLike")
}

export async function DeleteCasePurchase(userId: string, _id?: Types.ObjectId, suffix?: string) {
    await userModel.findByIdAndUpdate(userId, {
        $pull: {
            casesPurchases: {
                Item: _id,
                suffix
            }
        }
    })

    revalidateTag("userLike")
}

