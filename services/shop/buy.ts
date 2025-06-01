"use server";
import {userModel} from "@db/models";
import {MostikiEmail} from "@email/mostiki";
import {Resend} from "resend";
import {User} from "lucia";
import { revalidateTag } from "next/cache";
import { AddWLConsole } from "@services/console";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function Buy(mostiki: User["mostiki"], authorId: User["_id"]) {
    const author = await userModel.findByIdAndUpdate(authorId, {
        $inc: {
            mostiki: -mostiki
        }
    })

    revalidateTag("userLike")

    if (!author) return

    AddWLConsole(author.name)

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
}