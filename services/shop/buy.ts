'use server'
import { userModel } from '@db/models'
import { MostikiEmail } from '@email/mostiki'
import { Resend } from 'resend'
import { revalidateTag } from 'next/cache'
import { AddWLConsole } from '@services/console'
import type { StateId } from '@/types/state'
import { GetMostiki } from '@/lib/utils'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function Buy({ data: { _id } }: StateId, formData: FormData): Promise<StateId> {
  const months = Number(formData.get('months'))
  const faded_rating = Number(formData.get('faded_rating'))
  const mostiki = GetMostiki(months, faded_rating)

  const author = await userModel.findByIdAndUpdate(_id, {
    $inc: {
      mostiki: -mostiki,
      days: 30 * months,
      faded_rating: -faded_rating,
    }
  })

  revalidateTag('userLike')

  if (!author) return { success: false, error: 'Пользователь не найден', data: { _id } }

  await AddWLConsole(author.name)

  if (author.notifications.mostiki) {
    await resend.emails.send({
      from: 'Майнбридж <mostiki@m-br.ru>',
      to: author.email,
      subject: 'Изменения в мостиках на MineBridge',
      react: MostikiEmail({
        name: author.name,
        mostiki: -mostiki,
        allMostiki: author.mostiki - mostiki,
      }),
    })
  }

  return { success: true, data: { _id } }
}
