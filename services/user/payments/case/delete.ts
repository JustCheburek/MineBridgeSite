'use server'

import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'
import { Types } from 'mongoose'

export async function DeleteCasePurchase(userId: string, _id?: Types.ObjectId, suffix?: string) {
  await userModel.findByIdAndUpdate(userId, {
    $pull: {
      casesPurchases: {
        Item: _id,
        suffix,
      },
    },
  })

  revalidateTag('userLike')
}
