import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { AUTH_COOKIE_NAME, createPrivateSessionToken } from '@/lib/private-auth'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (!pathname.startsWith('/cb-lab')) {
    return NextResponse.next()
  }

  if (pathname === '/cb-lab/access') {
    return NextResponse.next()
  }

  const expectedToken = await createPrivateSessionToken()
  const currentToken = request.cookies.get(AUTH_COOKIE_NAME)?.value

  if (!expectedToken || currentToken !== expectedToken) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/cb-lab/access'
    redirectUrl.searchParams.set('next', pathname + request.nextUrl.search)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cb-lab/:path*']
}
