import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { createProspectReport } from '@/lib/performance-report'
import { AUTH_COOKIE_NAME, createPrivateSessionToken } from '@/lib/private-auth'
import { storeReport } from '@/lib/report-storage'

function normalizeWebsiteUrl(value: string) {
  const raw = value.trim()
  if (!raw) return ''
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`

  try {
    const parsed = new URL(candidate)
    if (!parsed.hostname) {
      return ''
    }

    return parsed.toString()
  } catch {
    return ''
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const currentToken = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const expectedToken = await createPrivateSessionToken()

  if (!expectedToken || currentToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const websiteUrl = normalizeWebsiteUrl(String(formData.get('websiteUrl') ?? ''))

  if (!websiteUrl) {
    const redirectUrl = new URL('/cb-lab/reporting', request.url)
    redirectUrl.searchParams.set('error', 'Agrega una URL válida para generar el reporte.')
    return NextResponse.redirect(redirectUrl)
  }

  try {
    const report = await createProspectReport({
      companyName: String(formData.get('companyName') ?? ''),
      websiteUrl,
      industry: String(formData.get('industry') ?? ''),
      city: String(formData.get('city') ?? ''),
      contactName: String(formData.get('contactName') ?? ''),
      contactPhone: String(formData.get('contactPhone') ?? ''),
      contactEmail: String(formData.get('contactEmail') ?? ''),
      primaryCta: String(formData.get('primaryCta') ?? ''),
      notes: String(formData.get('notes') ?? '')
    })

    await storeReport(report)

    return NextResponse.redirect(new URL(`/cb-lab/reporting/${report.id}`, request.url))
  } catch (error) {
    const redirectUrl = new URL('/cb-lab/reporting', request.url)
    redirectUrl.searchParams.set(
      'error',
      error instanceof Error ? error.message : 'No fue posible generar el reporte.'
    )
    return NextResponse.redirect(redirectUrl)
  }
}
