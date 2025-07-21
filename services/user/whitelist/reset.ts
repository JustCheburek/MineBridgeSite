'use server'

import { userModel } from '@/db/models'
import { revalidateTag } from 'next/cache'

export async function ResetWhitelist() {
  await userModel.updateMany({ whitelist: true }, { whitelist: false })
  revalidateTag('users')
}
