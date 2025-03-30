"use server";

import {User} from "@/types/user";
import {codeModel, userModel} from "@server/models";
import {Resend} from "resend";
import {Code} from "@/types/code";
import {UseCodeEmail} from "@email/useCode";
import {revalidateTag} from "next/cache";
import {getCode} from "@/services";

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

    if (!user || !user?.notifications?.code) return

    await resend.emails.send({
        from: 'Майнбридж <code@m-br.ru>',
        to: user.email,
        subject: 'Использование кода на MineBridge',
        react: UseCodeEmail(
            {name: user.name, mostiki: code.mostiki, allMostiki: user.mostiki + code.mostiki, code: code._id}
        )
    })
}