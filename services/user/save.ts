"use server";
import {Punishment} from "@/types/punishment";
import {userModel} from "@server/models";
import {revalidateTag} from 'next/cache'
import {RatingEmail} from "@email/rating";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SavePunishments(_id: string, data: Punishment[]) {
    const user = await userModel.findById(_id)
    if (!user) return

    const oldRating = user.rating
    user.rating = data.reduce(
        (accum, {rating}) => accum + rating, 0
    )
    user.punishments = data

    await user.save()

    revalidateTag("userLike")

    if (oldRating !== user.rating) {
        await resend.emails.send({
            from: 'Майнбридж <rating@m-br.ru>',
            to: user.email,
            subject: 'Изменения в звёздах на MineBridge',
            react: RatingEmail({name: user.name, rating: user.rating, oldRating})
        })
    }
}