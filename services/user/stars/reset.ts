'use server'

import { userModel } from '@/db/models'
import { revalidateTag } from 'next/cache'

export async function ResetStars() {
  // Перенос из rating в faded_rating
  await userModel.updateMany({ rating: { $gt: -1 } }, [
    { $inc: { faded_rating: '$rating' }, $set: { rating: 0, punishments: [] } },
  ])
  revalidateTag('users')
}
