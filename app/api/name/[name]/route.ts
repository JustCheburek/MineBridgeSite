import { getUser } from '@services/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ name: string; place: string }>
  }
) {
  const { name } = await params

  const { user } = await getUser({ name })

  return NextResponse.json(user)
}
