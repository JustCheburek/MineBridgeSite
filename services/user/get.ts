"use server";

import {GetHoursConsole, RconMB} from "@services/console";
import {userModel} from "@db/models";
import {revalidateTag} from "next/cache";
import {AUTO} from "@/const";
import {Resend} from "resend";
import {HoursEmail} from "@email/hours";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GetPrize(name: string) {
    const client = await RconMB()

    await client.send(`tw trigger health_prize ${name}`)
}

export async function GetStars(_id: string) {
    const user = await userModel.findById(_id)
    if (!user) return

    try {
        const hours = await GetHoursConsole(user.name)

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
                author: AUTO.HOURS
            })
            user.rating += hours
            await user.save()

            if (user.notifications.hours) {
                await resend.emails.send({
                    from: 'Майнбридж <hours@m-br.ru>',
                    to: user.email,
                    subject: 'Часы игры на MineBridge',
                    react: HoursEmail({name: user.name, hours})
                })
            }
        } else {
            console.error(text)
        }
    } catch (e) {
        console.error(e)
    }

    revalidateTag(`userLike`)
}