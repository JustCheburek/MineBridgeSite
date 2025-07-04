'use server'

import { userModel } from '@db/models'
import { revalidateTag } from 'next/cache'
import { RemoveSuffixConsole, SetSuffixConsole } from '@services/console'

export async function AddSuffix(formData: FormData, _id: string, name: string, index: number) {
  const suffix = formData.get('name') as string

  const user = await userModel.findByIdAndUpdate(_id)

  if (!user) {
    throw new Error(`Пользователь не найден`)
  }

  user.casesPurchases[index].suffix = suffix
  await SelectSuffix(suffix, _id, name)

  await user.save()

  revalidateTag('userLike')
}

export async function DropSuffix(_id: string, name: string) {
  await RemoveSuffixConsole(name)
  await userModel.findByIdAndUpdate(_id, { suffix: '' })

  revalidateTag('userLike')
}

export async function SelectSuffix(suffix: string, _id: string, name: string) {
  await SetSuffixConsole(suffix, name)
  await userModel.findByIdAndUpdate(_id, { suffix })

  revalidateTag('userLike')
}
