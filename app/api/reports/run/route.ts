import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { createProspectReport } from '@/lib/performance-report'
import { AUTH_COOKIE_NAME, createPrivateSessionToken } from '@/lib/private-auth'

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
    return NextResponse.json(
      { error: 'Agrega una URL válida para generar el reporte.' },
      { status: 400 }
    )
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
      monthlyVisits: String(formData.get('monthlyVisits') ?? ''),
      averageTicket: String(formData.get('averageTicket') ?? ''),
      closeRate: String(formData.get('closeRate') ?? ''),
      contentSourceUrl: String(formData.get('contentSourceUrl') ?? ''),
      visionGeneralP1: String(formData.get('visionGeneralP1') ?? ''),
      visionGeneralP2: String(formData.get('visionGeneralP2') ?? ''),
      visionUxP1: String(formData.get('visionUxP1') ?? ''),
      visionUxP2: String(formData.get('visionUxP2') ?? ''),
      opportunityAreasP1: String(formData.get('opportunityAreasP1') ?? ''),
      opportunityAreasP2: String(formData.get('opportunityAreasP2') ?? ''),
      opportunityInconsistenciesP1: String(formData.get('opportunityInconsistenciesP1') ?? ''),
      opportunityInconsistenciesP2: String(formData.get('opportunityInconsistenciesP2') ?? ''),
      nextStepsSubtitle: String(formData.get('nextStepsSubtitle') ?? ''),
      nextStepOneTitle: String(formData.get('nextStepOneTitle') ?? ''),
      nextStepOneText: String(formData.get('nextStepOneText') ?? ''),
      nextStepTwoTitle: String(formData.get('nextStepTwoTitle') ?? ''),
      nextStepTwoText: String(formData.get('nextStepTwoText') ?? ''),
      nextStepThreeTitle: String(formData.get('nextStepThreeTitle') ?? ''),
      nextStepThreeText: String(formData.get('nextStepThreeText') ?? ''),
      workPlanSubtitle: String(formData.get('workPlanSubtitle') ?? ''),
      phaseOneTitle: String(formData.get('phaseOneTitle') ?? ''),
      phaseTwoTitle: String(formData.get('phaseTwoTitle') ?? ''),
      phaseThreeTitle: String(formData.get('phaseThreeTitle') ?? ''),
      phaseFourTitle: String(formData.get('phaseFourTitle') ?? ''),
      visionImpactText: String(formData.get('visionImpactText') ?? ''),
      visionImpactTextSecondary: String(formData.get('visionImpactTextSecondary') ?? ''),
      visionConversionText: String(formData.get('visionConversionText') ?? ''),
      visionConversionTextSecondary: String(formData.get('visionConversionTextSecondary') ?? ''),
      nextStepNapText: String(formData.get('nextStepNapText') ?? ''),
      nextStepDataText: String(formData.get('nextStepDataText') ?? ''),
      nextStepIndexText: String(formData.get('nextStepIndexText') ?? ''),
      phaseOneText: String(formData.get('phaseOneText') ?? ''),
      phaseTwoText: String(formData.get('phaseTwoText') ?? ''),
      phaseThreeText: String(formData.get('phaseThreeText') ?? ''),
      phaseFourText: String(formData.get('phaseFourText') ?? ''),
      notes: String(formData.get('notes') ?? '')
    })

    return NextResponse.json({ report })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'No fue posible generar el reporte.'
      },
      { status: 400 }
    )
  }
}
