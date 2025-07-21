'use server'

import type { CaseData } from '@/types/purchase'
import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'

export async function AddCasePurchase(_id: string, CaseData: CaseData, price = 0) {
    const user = await userModel.findById(_id)
    if (!user) {
      throw new Error(`Пользователь не найден`)
    }
  
    user.casesPurchases.push({
      ...CaseData,
      Case: CaseData.Case._id,
      Drop: CaseData.Drop._id,
      DropItem: CaseData.DropItem._id,
      Item: CaseData.Item._id,
    })
  
    if (price) {
      user.mostiki -= price
    }
  
    await user.save()
  
    revalidateTag('userLike')
  }