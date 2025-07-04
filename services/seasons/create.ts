'use server'
import { Season } from '@/types/season'
import { seasonModel } from '@db/models'
import { revalidateTag } from 'next/cache'

export async function createSeason(formData: FormData) {
  const season = {
    number: Number(formData.get('number')),
    startAt: new Date(formData.get('startAt') as string),
    endAt: new Date(formData.get('endAt') as string),
  } satisfies Season

  await seasonModel.create(season)

  revalidateTag('seasons')
}
