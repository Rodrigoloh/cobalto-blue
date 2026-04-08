import { NextRequest, NextResponse } from 'next/server'

import {
  AUTH_COOKIE_NAME,
  createPrivateSessionToken,
  isPrivateAuthConfigured,
  validatePrivatePassword
} from '@/lib/private-auth'

function resolveSafeNext(value: FormDataEntryValue | null) {
  const next = typeof value === 'string' ? value : ''
  return next.startsWith('/cb-lab') ? next : '/cb-lab/reporting'
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const password = String(formData.get('password') ?? '')
  const nextPath = resolveSafeNext(formData.get('next'))
  const redirectUrl = new URL(nextPath, request.url)

  if (!isPrivateAuthConfigured()) {
    const setupUrl = new URL('/cb-lab/access', request.url)
    setupUrl.searchParams.set('setup', '1')
    return NextResponse.redirect(setupUrl)
  }

  if (!validatePrivatePassword(password)) {
    const deniedUrl = new URL('/cb-lab/access', request.url)
    deniedUrl.searchParams.set('error', '1')
    if (nextPath) {
      deniedUrl.searchParams.set('next', nextPath)
    }
    return NextResponse.redirect(deniedUrl)
  }

  const token = await createPrivateSessionToken()
  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14
  })

  return response
}
