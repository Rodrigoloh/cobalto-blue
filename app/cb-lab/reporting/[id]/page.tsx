'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { updateStoredReport } from '@/lib/report-browser-storage'
import type { ProspectReport } from '@/lib/performance-report'
import {
  formatCLS,
  formatMilliseconds,
  formatScore,
  getScoreStateLabel,
  getScoreTone
} from '@/lib/performance-report'

type ReportPageProps = {
  params: {
    id: string
  }
}

function scoreTone(score: number) {
  if (getScoreTone(score) === 'red') return 'text-red-600'
  if (getScoreTone(score) === 'amber') return 'text-amber-600'
  return 'text-emerald-600'
}

function ReportDetailContent({ initialReport }: { initialReport: ProspectReport }) {
  const [report, setReport] = useState(initialReport)
  const [assistState, setAssistState] = useState<{
    hookSummary: 'idle' | 'loading'
    costOfInaction: 'idle' | 'loading'
  }>({
    hookSummary: 'idle',
    costOfInaction: 'idle'
  })
  const [assistError, setAssistError] = useState<string | null>(null)
  const mobile = report.pagespeed.mobile
  const desktop = report.pagespeed.desktop

  function handleNarrativeSave(field: 'hookSummary' | 'costOfInaction', value: string) {
    const updated = updateStoredReport(report.id, (current) => ({
      ...current,
      [field]: value
    }))

    if (updated) {
      setReport(updated)
    }
  }

  async function handleAssist(field: 'hookSummary' | 'costOfInaction') {
    setAssistError(null)
    setAssistState((current) => ({ ...current, [field]: 'loading' }))

    try {
      const response = await fetch('/api/reports/assist-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          field,
          companyName: report.input.companyName,
          websiteUrl: report.input.websiteUrl,
          currentText: report[field]
        })
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok || !payload?.text) {
        throw new Error(payload?.error || 'No fue posible obtener sugerencia de Gemini.')
      }

      handleNarrativeSave(field, String(payload.text))
    } catch (error) {
      setAssistError(
        error instanceof Error ? error.message : 'No fue posible obtener sugerencia de Gemini.'
      )
    } finally {
      setAssistState((current) => ({ ...current, [field]: 'idle' }))
    }
  }

  return (
    <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-[#111111] p-8 text-white shadow-2xl lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-white/55">
              reporte generado
            </p>
            <h1 className="mt-4 font-['NeueMachina'] text-4xl leading-none md:text-5xl">
              {report.input.companyName}
            </h1>
            <p className="mt-3 max-w-3xl text-white/72">{report.hookSummary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/cb-lab/reporting/${report.id}/hook`}
              className="rounded-full border border-white/20 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Hook PDF
            </Link>
            <Link
              href={`/cb-lab/reporting/${report.id}/full`}
              className="rounded-full bg-[#1F00FF] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Full PDF
            </Link>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                score general
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className={`font-['NeueMachina'] text-7xl leading-none ${scoreTone(report.overallScore)}`}>
                    {report.overallScore}
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-black/45">
                    Estado: {getScoreStateLabel(report.overallScore)}
                  </p>
                </div>
                <div className="max-w-xs rounded-3xl border border-black/10 bg-white/60 p-4 text-sm text-black/65">
                  {report.technicalSummary}
                </div>
              </div>
            </div>

            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                snapshot
              </p>
              {mobile?.screenshot ? (
                <img
                  src={mobile.screenshot}
                  alt={`Vista capturada de ${report.input.companyName}`}
                  className="mt-5 w-full rounded-[1.5rem] border border-black/10 object-cover shadow-lg"
                />
              ) : (
                <div className="mt-5 flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-black/15 bg-white/40 text-sm text-black/45">
                  No se recibió screenshot desde PageSpeed.
                </div>
              )}
            </div>

            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                narrativa editable
              </p>
              <div className="mt-5 space-y-5">
                {assistError ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {assistError}
                  </p>
                ) : null}
                <label className="block space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-black/70">Lectura comercial</span>
                    <button
                      type="button"
                      onClick={() => handleAssist('hookSummary')}
                      disabled={assistState.hookSummary === 'loading'}
                      className="rounded-full border border-black px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-60"
                    >
                      {assistState.hookSummary === 'loading' ? 'Gemini...' : 'Sugerir con Gemini'}
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={report.hookSummary}
                    onChange={(event) => handleNarrativeSave('hookSummary', event.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  />
                </label>
                <label className="block space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-black/70">Señal de negocio</span>
                    <button
                      type="button"
                      onClick={() => handleAssist('costOfInaction')}
                      disabled={assistState.costOfInaction === 'loading'}
                      className="rounded-full border border-black px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition hover:bg-black hover:text-white disabled:cursor-wait disabled:opacity-60"
                    >
                      {assistState.costOfInaction === 'loading' ? 'Gemini...' : 'Sugerir con Gemini'}
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={report.costOfInaction}
                    onChange={(event) =>
                      handleNarrativeSave('costOfInaction', event.target.value)
                    }
                    className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  />
                </label>
                <p className="text-xs text-black/50">
                  Estos cambios se guardan en este navegador y se reflejan en los PDFs.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
                  <div className="report-card rounded-[2rem] p-6 lg:p-8">
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      métricas PageSpeed
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">PSI Mobile</p>
                  <p className="mt-2 text-3xl">{formatScore(mobile?.performanceScore ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    FCP {formatMilliseconds(mobile?.firstContentfulPaint ?? null)} · LCP{' '}
                    {formatMilliseconds(mobile?.largestContentfulPaint ?? null)}
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">PSI Desktop</p>
                  <p className="mt-2 text-3xl">{formatScore(desktop?.performanceScore ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    SEO {formatScore(desktop?.seoScore ?? null)} · Accesibilidad{' '}
                    {formatScore(desktop?.accessibilityScore ?? null)}
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Bloqueo</p>
                  <p className="mt-2 text-3xl">{formatMilliseconds(mobile?.totalBlockingTime ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    TBT del navegador durante la carga.
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Estabilidad</p>
                  <p className="mt-2 text-3xl">{formatCLS(mobile?.cumulativeLayoutShift ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    CLS de referencia y consistencia visual durante la carga.
                  </p>
                </div>
              </div>
            </div>

            {report.input.contactName || report.input.contactPhone || report.input.contactEmail ? (
              <div className="report-card rounded-[2rem] p-6 lg:p-8">
                <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                  contacto del prospecto
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/45">Nombre</p>
                    <p className="mt-2 text-lg">{report.input.contactName || 'N/D'}</p>
                  </div>
                  <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/45">Teléfono</p>
                    <p className="mt-2 text-lg">{report.input.contactPhone || 'N/D'}</p>
                  </div>
                  <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/45">Correo</p>
                    <p className="mt-2 text-lg break-all">{report.input.contactEmail || 'N/D'}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                estado de salud
              </p>
              <div className="mt-5 space-y-3">
                {report.healthRows.map((row) => (
                  <div key={row.metric} className="rounded-3xl border border-black/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-black">{row.metric}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-black/55">
                        {row.emoji} {row.state}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-black/65">{row.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                fuente utilizada
              </p>
              <div className="mt-5 rounded-3xl border border-black/10 bg-white/60 p-4 text-sm text-black/65">
                <p className="font-semibold text-black">Google PageSpeed Insights</p>
                <p className="mt-2">
                  {report.sourceStatus.pagespeed
                    ? 'Activo y usado en el reporte.'
                    : report.sourceStatus.pagespeedMessage || 'Sin datos.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ReportDetailPage({ params }: ReportPageProps) {
  return (
    <ReportBrowserState id={params.id}>
      {(report) => <ReportDetailContent initialReport={report} />}
    </ReportBrowserState>
  )
}
