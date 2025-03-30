"use server";

import {User} from "@/types/user";
import {codeModel, userModel} from "@server/models";
import {Resend} from "resend";
import {CreateCodeEmail} from "@email/createCode";
import {generateId} from "lucia";
import {revalidateTag} from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function CreateCode(mostiki: User["mostiki"], _id: User["_id"]) {
    const user = await userModel.findByIdAndUpdate(_id, {
        $inc: {
            mostiki: -mostiki
        }
    })

    const codeId = generateId(8)
    const code = await codeModel.create({_id: codeId, mostiki, authorId: _id})

    revalidateTag("userLike")
    revalidateTag("shop")

    if (!user || !user?.notifications?.code) return

    await resend.emails.send({
        from: 'Майнбридж <code@m-br.ru>',
        to: user.email,
        subject: 'Создание кода на MineBridge',
        react: CreateCodeEmail(
            {name: user.name, mostiki, allMostiki: user.mostiki - mostiki, code: code._id}
        )
    })
}