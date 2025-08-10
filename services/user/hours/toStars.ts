'use server'

import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'
import { AUTO } from '@/const'
import { StateId } from '@/types/state'
import { getTime } from '@services/user/hours'

export async function ToStars({ data: { _id } }: StateId): Promise<StateId> {
  const user = await userModel.findById(_id)
  if (!user) return { success: false, error: 'Пользователь не найден', data: { _id } }

  const allHours = await getTime(user.name)
  const allStars = Math.floor(allHours / 2)
  const hours = allHours - (user.hours || 0)
  const stars = Math.floor(Math.min(hours, 24) / 2)

  user.punishments = user.punishments?.filter(({ author }) => author !== AUTO.HOURS)
  user.punishments?.push({
    reason: `Часы: ${allHours}`,
    rating: allStars,
    author: AUTO.HOURS,
  })
  user.hours = allHours
  user.rating += stars
  await user.save()

  revalidateTag(`userLike`)

  return { success: true, data: { _id } }
}
