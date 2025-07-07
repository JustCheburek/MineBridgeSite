import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { MBSESSION } from '@/const'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete(MBSESSION)

  revalidatePath('/')

  return NextResponse.redirect(new URL('/', request.url))
}
