import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIE_NAME, createPrivateSessionToken } from '@/lib/private-auth'

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

function buildPrompt(
  field: 'hookSummary' | 'costOfInaction',
  companyName: string,
  websiteUrl: string,
  currentText: string
) {
  if (field === 'hookSummary') {
    return [
      'Actua como estratega comercial de una agencia digital premium.',
      `Reescribe una lectura comercial breve para un reporte de rendimiento web de ${companyName}.`,
      `Sitio: ${websiteUrl}.`,
      'Objetivo: sonar claro, ejecutivo, persuasivo y fácil de entender para un cliente no técnico.',
      'Limites: 2 o 3 frases, en español, sin viñetas, sin tecnicismos innecesarios y sin promesas exageradas.',
      'Enfócate en percepción de marca, velocidad, permanencia del usuario y posibilidad de contacto.',
      `Texto actual: ${currentText}`
    ].join('\n')
  }

  return [
    'Actua como estratega comercial de una agencia digital premium.',
    `Reescribe una "señal de negocio" breve para un reporte de rendimiento web de ${companyName}.`,
    `Sitio: ${websiteUrl}.`,
    'Objetivo: explicar de forma elegante y clara el costo de no actuar, con tono comercial y entendible para dirección o dueño de empresa.',
    'Limites: 2 o 3 frases, en español, sin viñetas, sin tecnicismos innecesarios y sin sonar agresivo.',
    'Enfócate en confianza, pérdida de atención, conversión y competitividad digital.',
    `Texto actual: ${currentText}`
  ].join('\n')
}

function extractText(payload: any) {
  return (
    payload?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part?.text)
      .filter(Boolean)
      .join('\n')
      .trim() || ''
  )
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const currentToken = cookieStore.get(AUTH_COOKIE_NAME)?.value
  const expectedToken = await createPrivateSessionToken()

  if (!expectedToken || currentToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Falta configurar GEMINI_API_KEY en Vercel.' },
      { status: 400 }
    )
  }

  const body = await request.json().catch(() => null)
  const field = body?.field as 'hookSummary' | 'costOfInaction' | undefined
  const companyName = String(body?.companyName ?? '')
  const websiteUrl = String(body?.websiteUrl ?? '')
  const currentText = String(body?.currentText ?? '')

  if (!field || !['hookSummary', 'costOfInaction'].includes(field)) {
    return NextResponse.json({ error: 'Campo inválido.' }, { status: 400 })
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildPrompt(field, companyName, websiteUrl, currentText) }]
          }
        ]
      }),
      cache: 'no-store'
    }
  )

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          payload?.error?.message ||
          'No fue posible obtener sugerencia desde Gemini.'
      },
      { status: response.status }
    )
  }

  const text = extractText(payload)

  if (!text) {
    return NextResponse.json(
      { error: 'Gemini no devolvió texto utilizable.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ text })
}
