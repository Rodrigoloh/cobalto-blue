import { NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIE_NAME } from '@/lib/private-auth'

export async function POST(request: NextRequest) {
  const redirectUrl = new URL('/cb-lab/access?loggedOut=1', request.url)
  const response = NextResponse.redirect(redirectUrl, 303)

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  })

  return response
}
