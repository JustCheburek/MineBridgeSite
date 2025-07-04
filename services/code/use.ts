'use server'

import { codeModel, userModel } from '@db/models'
import { Resend } from 'resend'
import { UseCodeEmail } from '@email/useCode'
import { revalidateTag } from 'next/cache'
import { getCode } from '@services/code'
import { getUser } from '@services/user'
import { UsedCodeEmail } from '@email/usedCode'
import { StateId } from '@/types/state'
import { z } from 'zod/v4'

const resend = new Resend(process.env.RESEND_API_KEY)

const useCodeSchema = z.object({
  code: z.string().min(1, 'Код обязателен').max(20),
})

export async function UseCode({ data: { _id } }: StateId, formData: FormData): Promise<StateId> {
  const result = useCodeSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
      data: { _id },
    }
  }

  const { code: codeId } = result.data

  try {
    const code = await getCode(codeId)
    if (!code) return { success: false, error: 'Код не найден', data: { _id } }

    await codeModel.findByIdAndDelete(codeId)

    const user = await userModel.findById(_id)
    if (!user) return { success: false, error: 'Пользователь не найден', data: { _id } }

    // Обновление баланса
    user.mostiki += code.mostiki
    await user.save()

    revalidateTag('all')

    const { user: author } = await getUser({ _id: code.authorId, throwNotFound: false })

    if (author) {
      if (user.notifications?.code) {
        await resend.emails.send({
          from: 'Майнбридж <code@m-br.ru>',
          to: user.email,
          subject: 'Использование кода на MineBridge',
          react: UseCodeEmail({
            name: user.name,
            mostiki: code.mostiki,
            allMostiki: user.mostiki,
            code: code._id,
            authorName: author.name,
          }),
        })
      }

      if (author.notifications?.code) {
        await resend.emails.send({
          from: 'Майнбридж <code@m-br.ru>',
          to: author.email,
          subject: 'Использование кода на MineBridge',
          react: UsedCodeEmail({
            name: author.name,
            mostiki: code.mostiki,
            code: code._id,
            userName: user.name,
          }),
        })
      }
    }

    return { success: true, data: { _id: user._id } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка при использовании кода',
      data: { _id },
    }
  }
}
