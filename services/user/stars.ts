'use server'

import { userModel } from '@/db/models'
import { revalidateTag } from 'next/cache'

export async function stars() {
    // Перенос из rating в faded_rating
    await userModel.updateMany(
        { rating: { $gt: 0 } }, 
        [{ $set: { faded_rating: "$rating", rating: 0 } }]
    )
    revalidateTag('users')
}
