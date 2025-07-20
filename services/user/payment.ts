'use server'

import { z } from 'zod/v4'
import { EasyDonateApiClient } from '@scondic/easydonate-sdk'
import { userModel } from '@db/models'
import type { ExtraStateId } from '@/types/state'

export type Url = { url?: string }
export type UrlState = ExtraStateId<Url>

const easydonate = new EasyDonateApiClient(process.env.EASYDONATE_SECRET!)

const paymentSchema = z.object({
  mostiki: z.preprocess(val => Number(val), z.number().positive().int().min(1)),
  code: z.string().optional(),
})

export async function CreatePaymentLink(
  { data: { _id } }: UrlState,
  formData: FormData
): Promise<UrlState> {
  const result = paymentSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; '),
      data: { _id },
    }
  }

  const { mostiki, code } = result.data

  try {
    const user = await userModel.findById(_id)
    if (!user) return { success: false, error: 'Пользователь не найден', data: { _id } }

    const payment = await easydonate.getPaymentLink(
      user.name,
      Number(process.env.EASYDONATE_SERVERID!),
      { [Number(process.env.EASYDONATE_MOSTIKIID!)]: mostiki },
      new URL('/shop/buy/success', process.env.NEXT_PUBLIC_EN_URL!).toString(),
      user.email,
      code
    )

    return { success: true, data: { _id, url: payment.response.url } }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Ошибка при создании платежной ссылки',
      data: { _id },
    }
  }
}
