"use server";
import {userModel} from "@server/models";
import {revalidateTag} from 'next/cache'
import {redirect} from "next/navigation";

export async function DeleteUser(_id: string) {
    "use server"

    await userModel.findByIdAndDelete(_id)

    revalidateTag("userLike")
    redirect("/auth")
}