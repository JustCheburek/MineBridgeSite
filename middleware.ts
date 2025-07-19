import { verifyRequestOrigin } from 'lucia'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === 'GET') {
    return NextResponse.next()
  }
  const originHeader = request.headers.get('Origin')
  const forwardedHost = request.headers.get('X-Forwarded-Host')
  if (!originHeader || !forwardedHost || !verifyRequestOrigin(originHeader, [forwardedHost])) {
    return new NextResponse(null, {
      status: 403,
    })
  }
  return NextResponse.next()
}
