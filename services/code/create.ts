'use server'

import { codeModel, userModel } from '@db/models'
import { Resend } from 'resend'
import { CreateCodeEmail } from '@email/createCode'
import { generateId } from 'lucia'
import { revalidateTag } from 'next/cache'
import { StateId } from '@/types/state'
import { z } from 'zod/v4'

const resend = new Resend(process.env.RESEND_API_KEY)

const createCodeSchema = z.object({
  mostiki: z.preprocess(val => Number(val), z.number().positive().int().min(1)),
})

export async function CreateCode({ data: { _id } }: StateId, formData: FormData): Promise<StateId> {
  const result = createCodeSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
      data: { _id },
    }
  }

  const { mostiki } = result.data

  try {
    const user = await userModel.findById(_id)
    if (!user) return { success: false, error: 'Пользователь не найден', data: { _id } }

    // Проверка достаточного количества мостиков
    if (user.mostiki < mostiki) {
      return { success: false, error: 'Недостаточно мостиков', data: { _id } }
    }

    // Обновление баланса
    user.mostiki -= mostiki
    await user.save()

    const codeId = generateId(8)
    const code = await codeModel.create({ _id: codeId, mostiki, authorId: _id })

    revalidateTag('all')

    if (user.notifications?.code) {
      await resend.emails.send({
        from: 'Майнбридж <code@m-br.ru>',
        to: user.email,
        subject: 'Создание кода на MineBridge',
        react: CreateCodeEmail({
          name: user.name,
          mostiki,
          allMostiki: user.mostiki,
          code: code._id,
        }),
      })
    }

    return { success: true, data: { _id: user._id } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка при создании кода',
      data: { _id },
    }
  }
}
