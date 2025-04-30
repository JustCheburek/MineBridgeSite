"use server";

import {User} from "@/types/user";
import {codeModel, userModel} from "@db/models";
import {Resend} from "resend";
import {Code} from "@/types/code";
import {UseCodeEmail} from "@email/useCode";
import {revalidateTag} from "next/cache";
import {getCode, getUser} from "@/services";
import {UsedCodeEmail} from "@email/usedCode";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function UseCode(codeId: Code["_id"], _id: User["_id"]) {
    const code = await getCode(codeId)
    await codeModel.findByIdAndDelete(codeId)

    const user = await userModel.findByIdAndUpdate(_id, {
        $inc: {
            mostiki: code.mostiki
        }
    })

    revalidateTag("userLike")
    revalidateTag("shop")

    const {user: author} = await getUser({_id: code.authorId, throwNotFound: false})
    if (!user || !author) return

    if (user?.notifications?.code) {
        await resend.emails.send({
            from: 'Майнбридж <code@m-br.ru>',
            to: user.email,
            subject: 'Использование кода на MineBridge',
            react: UseCodeEmail(
                {
                    name: user.name,
                    mostiki: code.mostiki,
                    allMostiki: user.mostiki + code.mostiki,
                    code: code._id,
                    authorName: author.name
                }
            )
        })
    }
    if (author.notifications.code) {
        await resend.emails.send({
            from: 'Майнбридж <code@m-br.ru>',
            to: user.email,
            subject: 'Использование кода на MineBridge',
            react: UsedCodeEmail(
                {
                    name: author.name,
                    mostiki: code.mostiki,
                    code: code._id,
                    userName: user.name
                }
            )
        })
    }
}