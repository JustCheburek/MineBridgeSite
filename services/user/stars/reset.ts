'use server'

import { userModel } from '@/db/models'
import { revalidateTag } from 'next/cache'

export async function ResetStars() {
  // Перенос из rating в faded_rating
  await userModel.updateMany({ rating: { $gt: -1 } }, [
    { $set: { rating: 0, punishment: [] }, $inc: { faded_rating: '$rating' } },
  ])
  revalidateTag('users')
}
