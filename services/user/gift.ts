"use server";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";

export async function GiveGift(mostiki: number, userId: string, authorId: string) {
    await userModel.findByIdAndUpdate(authorId, {
        $inc: {
            mostiki: -mostiki
        }
    })
    await userModel.findByIdAndUpdate(userId, {
        $inc: {
            mostiki: mostiki
        }
    })
    revalidateTag("userLike")
}