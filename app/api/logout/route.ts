import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { MBSESSION } from '@/const'
import { revalidatePath } from 'next/cache'
import { lucia } from '@/db/lucia'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(MBSESSION)?.value
  if (sessionId) {
    await lucia.invalidateSession(sessionId)
  }
  cookieStore.delete(MBSESSION)

  revalidatePath('/')

  return NextResponse.redirect(new URL('/', request.url))
}
