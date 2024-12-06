"use server";
import {userModel} from "@server/models";
import {unstable_expireTag as expireTag} from "next/cache";
import {redirect} from "next/navigation";

export async function DeleteUser(_id: string) {
    "use server"

    await userModel.findByIdAndDelete(_id)

    expireTag("userLike")
    redirect("/auth")
}