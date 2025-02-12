"use server";
import {Punishment} from "@/types/punishment";
import {userModel} from "@server/models";
import {revalidateTag} from 'next/cache'
import {getUser} from "@/services";
import {StarsHUBConsole, StarsMBConsole} from "@services/console";

export async function SavePunishments(_id: string, data: Punishment[]) {
    const {user: {rating}} = await getUser({_id}, false)

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

    await Promise.all([
        StarsMBConsole(rating - newRating, user.name),
        StarsHUBConsole(rating - newRating, user.name)
    ])
}