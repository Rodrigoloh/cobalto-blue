import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIE_NAME, createPrivateSessionToken } from '@/lib/private-auth'
import { runPageSpeedAudit } from '@/lib/performance-report'

function normalizeWebsiteUrl(value: string) {
  const raw = value.trim()
  if (!raw) return ''
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`

  try {
    const parsed = new URL(candidate)
    return parsed.hostname ? parsed.toString() : ''
  } catch {
    return ''
  }
}

function metric(value: number | null, formatter: (value: number | null) => string) {
  return {
    value: formatter(value),
    raw: value
  }
}

function formatMilliseconds(value: number | null) {
  if (value === null) return 'N/D'
  if (value >= 1000) return `${(value / 1000).toFixed(1)} s`
  return `${Math.round(value)} ms`
}

function formatCLS(value: number | null) {
  return value === null ? 'N/D' : value.toFixed(2)
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const currentToken = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const expectedToken = await createPrivateSessionToken()

  if (!expectedToken || currentToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json().catch(() => null)
  const websiteUrl = normalizeWebsiteUrl(String(payload?.websiteUrl ?? ''))

  if (!websiteUrl) {
    return NextResponse.json(
      { error: 'Agrega una URL valida para consultar PageSpeed.' },
      { status: 400 }
    )
  }

  try {
    const mobile = await runPageSpeedAudit(websiteUrl, 'mobile')

    return NextResponse.json({
      apiPageSpeedData: {
        performanceScore: mobile.performanceScore,
        accessibilityScore: mobile.accessibilityScore,
        bestPracticesScore: mobile.bestPracticesScore,
        seoScore: mobile.seoScore,
        fcp: metric(mobile.firstContentfulPaint, formatMilliseconds),
        lcp: metric(mobile.largestContentfulPaint, formatMilliseconds),
        tbt: metric(mobile.totalBlockingTime, formatMilliseconds),
        cls: metric(mobile.cumulativeLayoutShift, formatCLS),
        speedIndexMetric: metric(mobile.speedIndex, formatMilliseconds),
        capturedAt: mobile.capturedAt,
        emulatedDevice: mobile.emulatedDevice,
        sessionType: mobile.sessionType,
        loadType: mobile.loadType,
        throttling: mobile.throttling,
        browserEngine: mobile.browserEngine
      }
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'No fue posible consultar PageSpeed.'
      },
      { status: 400 }
    )
  }
}
