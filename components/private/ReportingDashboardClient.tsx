'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useMemo, useState } from 'react'

import {
  FullReportSnapshot,
  getStoredFullReports,
  saveStoredFullReport
} from '@/lib/full-report-browser-storage'

type ReportingDashboardClientProps = {
  geminiConfigured: boolean
}

const SAMPLE_JSON = `{
  "id": "cliente-demo",
  "geminiJson": {
    "companyName": "Cliente Demo",
    "websiteUrl": "https://cliente.com",
    "industry": "Servicios profesionales",
    "city": "Monterrey",
    "primaryCta": "WhatsApp",
    "financialImpact": {
      "monthlyVisits": 1500,
      "averageTicket": 15000,
      "closeRate": 0.2,
      "conversionRate": 0.025,
      "frictionRate": 0.22,
      "lostLeadsMonthly": 8.3,
      "lostRevenueMonthly": 24900,
      "lostRevenueAnnual": 298800
    },
    "visionGeneralP1": "",
    "visionGeneralP2": "",
    "visionUxP1": "",
    "visionUxP2": "",
    "opportunityAreasP1": "",
    "opportunityAreasP2": "",
    "opportunityInconsistenciesP1": "",
    "opportunityInconsistenciesP2": "",
    "nextStepsSubtitle": "",
    "nextStepOneTitle": "",
    "nextStepOneText": "",
    "nextStepTwoTitle": "",
    "nextStepTwoText": "",
    "nextStepThreeTitle": "",
    "nextStepThreeText": "",
    "workPlanSubtitle": "",
    "phaseOneTitle": "",
    "phaseOneText": "",
    "phaseTwoTitle": "",
    "phaseTwoText": "",
    "phaseThreeTitle": "",
    "phaseThreeText": "",
    "phaseFourTitle": "",
    "phaseFourText": ""
  },
  "apiPageSpeedData": null
}`

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value))
}

function slugId(value: string) {
  const normalized = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return normalized || `reporte-${Date.now()}`
}

function getReportName(mockData: any) {
  return (
    mockData?.geminiJson?.companyName ||
    mockData?.companyName ||
    mockData?.input?.companyName ||
    'Reporte JSON'
  )
}

function getWebsiteUrl(mockData: any) {
  return mockData?.geminiJson?.websiteUrl || mockData?.websiteUrl || mockData?.input?.websiteUrl || ''
}

function ensureReportId(mockData: any) {
  const company = getReportName(mockData)
  const explicitId = typeof mockData?.id === 'string' ? mockData.id.trim() : ''
  const id = explicitId || slugId(company)

  return {
    id,
    mockData: {
      ...mockData,
      id
    }
  }
}

export function ReportingDashboardClient({ geminiConfigured }: ReportingDashboardClientProps) {
  const router = useRouter()
  const [reports, setReports] = useState<FullReportSnapshot[]>([])
  const [jsonText, setJsonText] = useState(SAMPLE_JSON)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setReports(getStoredFullReports())
  }, [])

  const reportCountLabel = useMemo(() => `${reports.length} items`, [reports.length])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const parsed = JSON.parse(jsonText)

      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('El JSON debe ser un objeto.')
      }

      const websiteUrl = getWebsiteUrl(parsed)
      if (!websiteUrl) {
        throw new Error('El JSON debe incluir geminiJson.websiteUrl o websiteUrl para consultar PageSpeed.')
      }

      const { id, mockData } = ensureReportId(parsed)
      saveStoredFullReport({
        id,
        createdAt: new Date().toISOString(),
        mockData
      })
      setReports(getStoredFullReports())
      router.push(`/cb-lab/reporting/${id}/full`)
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'No fue posible leer el JSON.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="report-card rounded-[2rem] p-6 lg:p-8">
          <div className="mb-6 space-y-2">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
              nuevo reporte full
            </p>
            <h2 className="font-['NeueMachina'] text-3xl leading-none">Pegar JSON del reporte</h2>
            <p className="text-sm text-black/65">
              Pega el JSON generado por la Gem. El PDF usará esa narrativa y consultará PageSpeed
              en vivo con la URL incluida.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-black/70">JSON completo</span>
              <textarea
                value={jsonText}
                onChange={(event) => setJsonText(event.target.value)}
                rows={24}
                spellCheck={false}
                className="min-h-[520px] w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 font-mono text-xs leading-relaxed outline-none transition focus:border-[#1F00FF]"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-full bg-[#1F00FF] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? 'Validando JSON...' : 'Generar PDF full'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="report-card rounded-[2rem] p-6 lg:p-8">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
              flujo
            </p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">Contenido</p>
                <p className="mt-2 text-lg text-black">Gemini JSON</p>
                <p className="mt-2 text-sm text-black/65">
                  La narrativa, fases, pasos y bloque financiero salen del objeto `geminiJson`.
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">Métricas técnicas</p>
                <p className="mt-2 text-lg text-black">Google PageSpeed</p>
                <p className="mt-2 text-sm text-black/65">
                  El PDF consulta PageSpeed en vivo con `geminiJson.websiteUrl`. También acepta
                  `apiPageSpeedData` si ya viene precargado.
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">Asistencia de copy</p>
                <p className="mt-2 text-lg text-black">{geminiConfigured ? 'Gemini listo' : 'Opcional'}</p>
                <p className="mt-2 text-sm text-black/65">
                  {geminiConfigured
                    ? 'La variable GEMINI_API_KEY está configurada para futuros flujos asistidos.'
                    : 'El generador actual solo necesita el JSON final que pegues aquí.'}
                </p>
              </div>
            </div>
          </div>

          <div className="report-card rounded-[2rem] p-6 lg:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                  guardados
                </p>
                <h2 className="mt-3 font-['NeueMachina'] text-2xl leading-none">
                  PDFs full generados
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  Se guardan en este navegador para que puedas volver a abrirlos.
                </p>
              </div>
              <span className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black/55">
                {reportCountLabel}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {reports.length ? (
                reports.map((report) => (
                  <div
                    key={report.id}
                    className="rounded-3xl border border-black/10 bg-white/60 p-4 transition hover:border-[#1F00FF]/35"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                          {formatDate(report.createdAt)}
                        </p>
                        <h3 className="mt-2 text-lg">{getReportName(report.mockData)}</h3>
                        <p className="mt-1 break-all text-sm text-black/60">
                          {getWebsiteUrl(report.mockData)}
                        </p>
                      </div>

                      <Link
                        href={`/cb-lab/reporting/${report.id}/full`}
                        className="rounded-full bg-[#1F00FF] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-black"
                      >
                        Abrir full PDF
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-3xl border border-dashed border-black/15 px-4 py-6 text-sm text-black/55">
                  Pega un JSON para generar el primer reporte full.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
