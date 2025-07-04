import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { MBSESSION } from '@/const'
import { revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete(MBSESSION)

  revalidateTag('all')

  return NextResponse.redirect(new URL('/', request.url))
}
