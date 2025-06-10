"use server";
import { userModel } from "@db/models";
import { MostikiEmail } from "@email/mostiki";
import { Resend } from "resend";
import { revalidateTag } from "next/cache";
import { AddWLConsole } from "@services/console";
import { redirect } from "next/navigation";
import type { StateId } from "@/types/state";
import { PREMBCOST } from "@/const";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function Buy({data: {_id}}: StateId): Promise<StateId> {
    const author = await userModel.findByIdAndUpdate(_id, {
        whitelist: true,
        $inc: {
            mostiki: -PREMBCOST
        }
    })

    revalidateTag("userLike")

    if (!author) return { success: false, error: 'Пользователь не найден', data: {_id} }

    await AddWLConsole(author.name)

    if (author.notifications.mostiki) {
        await resend.emails.send({
            from: 'Майнбридж <mostiki@m-br.ru>',
            to: author.email,
            subject: 'Изменения в мостиках на MineBridge',
            react: MostikiEmail(
                { name: author.name, mostiki: -PREMBCOST, allMostiki: author.mostiki - PREMBCOST }
            )
        })
    }

    redirect(`/user/${author.name}`)
}