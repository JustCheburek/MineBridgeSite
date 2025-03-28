"use server"

import type {User} from "lucia";
import {userModel} from "@server/models";
import {revalidateTag} from "next/cache";
import {Notifications} from "@/types/notification";

export async function UpdateNotification(_id: User["_id"], formData: FormData) {
    const user = await userModel.findById(_id)
    if (!user) return
    if (!user.notifications) {
        user.notifications = new Notifications();
    }
    formData.forEach(
        (value, name) => {
            (user.notifications as any)[name] = value === "on" || value === "true"
        }
    )
    await user.save()
    revalidateTag("user")
}