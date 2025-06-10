"use server";
import { userModel } from "@db/models";
import { revalidateTag } from "next/cache";
import { MostikiEmail } from "@email/mostiki";
import { Resend } from "resend";
import { z } from "zod/v4";
import type { StateId } from "@/types/state";

const resend = new Resend(process.env.RESEND_API_KEY);

const giftSchema = z.object({
    mostiki: z.preprocess(
        (val) => Number(val),
        z.number().positive().int().min(1)
    )
});

export async function GiveGift({data: {_id, authorId}}: StateId, formData: FormData): Promise<StateId> {
    const result = giftSchema.safeParse(Object.fromEntries(formData.entries()))
    
    if (!result.success) {
        return { 
            success: false, 
            error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
            data: {_id, authorId}
        }
    }
    
    const { mostiki } = result.data

    try {
        const author = await userModel.findByIdAndUpdate(authorId, { $inc: { mostiki: -mostiki } })
        if (!author) return { success: false, error: 'Автор не найден', data: {_id, authorId} }
        if (author.mostiki < mostiki) return { success: false, error: 'Недостаточно мостиков', data: {_id, authorId} }
        
        const user = await userModel.findByIdAndUpdate(_id, { $inc: { mostiki } })
        if (!user) return { success: false, error: 'Пользователь не найден', data: {_id, authorId} }
        
        revalidateTag("userLike")

        // Отправка уведомлений
        const sendEmails = []
        
        if (author.notifications?.mostiki) {
            sendEmails.push(resend.emails.send({
                from: 'Майнбридж <mostiki@m-br.ru>',
                to: author.email,
                subject: 'Изменения в мостиках на MineBridge',
                react: MostikiEmail({ 
                    name: author.name, 
                    mostiki: -mostiki, 
                    allMostiki: author.mostiki - mostiki 
                })
            }))
        }

        if (user.notifications?.mostiki) {
            sendEmails.push(resend.emails.send({
                from: 'Майнбридж <mostiki@m-br.ru>',
                to: user.email,
                subject: 'Изменения в мостиках на MineBridge',
                react: MostikiEmail({ 
                    name: user.name, 
                    mostiki, 
                    allMostiki: user.mostiki + mostiki 
                })
            }))
        }
        
        if (sendEmails.length > 0) {
            await Promise.all(sendEmails)
        }
        
        return { success: true, data: { _id, authorId } }
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Ошибка при передаче мостиков',
            data: {_id, authorId}
        }
    }
}