"use server";

import {GetHours, RconMB} from "@services/console";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {AUTO} from "@/const";

export async function GetPrize(name: string) {
    const client = await RconMB()

    await client.send(`tw trigger health_prize ${name}`)
}

export async function GetStars(_id: string) {
    try {
        const user = await userModel.findById(_id)
        if (!user) return

        const hours = await GetHours(user.name)

        const client = await RconMB()
        const text = await client.send(`scoreboard players set ${user.name} hours 0`)
        client.disconnect()

        if (text.endsWith("0")) {
            const fullHours = user.punishments?.reduce(
                (accum, {rating, author}) => {
                    if (author !== AUTO.HOURS) {
                        rating = 0
                    }

                    return accum + rating
                }, 0
            ) + hours
            user.punishments = user.punishments?.filter(({author}) => author !== AUTO.HOURS)
            user.punishments?.push({
                reason: `Часы: ${fullHours}`,
                rating: fullHours,
                author: AUTO.HOURS,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            user.rating += hours
            user.save()
        } else {
            console.error(text)
        }
    } catch (e) {
        console.error(e)
    }

    revalidateTag(`userLike`)
}