"use server";

import {CaseData} from "@/types/purchase";
import {RconVC, SuffixConsole} from "@services/console";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {getUser} from "@/services";

export async function GetCosmetics(name: string, caseDatas: Partial<CaseData>[]) {
    function wait(ms: number) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Готово");
            }, ms);
        });
    }

    const client = await RconVC()

    for (const {DropItem, Item} of caseDatas) {
        if (DropItem?.name && Item?.name && DropItem.name !== "suffix") {
            await client.send(`lpv user ${name} permission set ultracosmetics.${DropItem.name}.${Item.name}`)
            await wait(1000)
        }
    }
}

export async function AddCasePurchase(_id: string, CaseData: CaseData) {
    await userModel.findByIdAndUpdate(
        _id,
        {
            $push: {
                casesPurchases: {
                    ...CaseData,
                    Case: CaseData.Case._id,
                    Drop: CaseData.Drop._id,
                    DropItem: CaseData.DropItem._id,
                    Item: CaseData.Item._id
                }
            },
        }
    )

    revalidateTag("userLike")
}

export async function RemoveCasePurchase(userId: string, _id: string) {
    await userModel.findByIdAndUpdate(userId, {
        $pull: {
            casesPurchases: {
                _id
            }
        }
    })

    revalidateTag("userLike")
}

export async function AddSuffix(formData: FormData, _id: string, index: number) {
    const suffix = formData.get("name") as string

    const user = await userModel.findByIdAndUpdate(_id)

    if (!user) {
        throw new Error(`Пользователь не найден`)
    }

    user.casesPurchases[index].suffix = suffix
    user.suffix = suffix

    await user.save()

    revalidateTag("userLike")
}

export async function SelectSuffix(suffix: string, _id: string) {
    try {
        const {user} = await getUser({_id}, false)

        await SuffixConsole(user.name, suffix)

        await userModel.findByIdAndUpdate(_id, {suffix})
    } catch (e) {
        console.error(e)
    }

    revalidateTag("userLike")
}