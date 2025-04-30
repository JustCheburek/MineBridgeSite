"use server";
import {userModel} from "@db/models";
import {revalidateTag} from "next/cache";
import {MostikiEmail} from "@email/mostiki";
import {Resend} from "resend";
import {User} from "lucia";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GiveGift(mostiki: User["mostiki"], userId: User["_id"], authorId: User["_id"]) {
    const author = await userModel.findByIdAndUpdate(authorId, {
        $inc: {
            mostiki: -mostiki
        }
    })
    const user = await userModel.findByIdAndUpdate(userId, {
        $inc: {
            mostiki: mostiki
        }
    })
    revalidateTag("userLike")

    if (!author || !user) return

    if (author.notifications.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: author.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                {name: author.name, mostiki: -mostiki, allMostiki: author.mostiki - mostiki}
            )
        })
    }

    if (user?.notifications?.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: user.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                {name: user.name, mostiki, allMostiki: user.mostiki + mostiki}
            )
        })
    }
}