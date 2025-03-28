"use server";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {HoursEmail} from "@email/hours";
import {MostikiEmail} from "@email/mostiki";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GiveGift(mostiki: number, userId: string, authorId: string) {
    const author = await userModel.findByIdAndUpdate(authorId, {
        $inc: {
            mostiki: -mostiki
        }
    }, {upsert: true})
    const user = await userModel.findByIdAndUpdate(userId, {
        $inc: {
            mostiki: mostiki
        }
    }, {upsert: true})
    revalidateTag("userLike")

    if (!author || !user) return

    if (author.notifications.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: author.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                {name: author.name, mostiki, allMostiki: author.mostiki}
            )
        })
    }

    if (user.notifications.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: user.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                {name: user.name, mostiki, allMostiki: user.mostiki}
            )
        })
    }
}