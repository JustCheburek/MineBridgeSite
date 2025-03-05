"use server";
import {Punishment} from "@/types/punishment";
import {userModel} from "@server/models";
import {revalidateTag} from 'next/cache'

export async function SavePunishments(_id: string, data: Punishment[]) {
    const newRating = data.reduce(
        (accum, {rating}) => accum + rating, 0
    )

    const user = await userModel.findByIdAndUpdate(
        _id,
        {
            punishments: data,
            rating: newRating
        }
    )

    revalidateTag("userLike")

    if (!user) return
}