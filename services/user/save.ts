"use server";
import {Punishment} from "@/types/punishment";
import {userModel} from "@server/models";
import {unstable_expireTag as expireTag} from "next/cache";

export async function SavePunishments(_id: string, data: Punishment[]) {
    await userModel.findByIdAndUpdate(
        _id,
        {
            punishments: data,
            rating: data.reduce(
                (accum, {rating}) => accum + rating, 0
            )
        }
    )

    expireTag("userLike")
}