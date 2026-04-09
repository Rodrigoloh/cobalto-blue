'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useMemo, useState } from 'react'

import type { ProspectReport } from '@/lib/performance-report'
import { getStoredReports, saveStoredReport } from '@/lib/report-browser-storage'

type ReportingDashboardClientProps = {
  gtmetrixConfigured: boolean
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value))
}

export function ReportingDashboardClient({
  gtmetrixConfigured
}: ReportingDashboardClientProps) {
  const router = useRouter()
  const [reports, setReports] = useState<ProspectReport[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setReports(getStoredReports())
  }, [])

  const reportCountLabel = useMemo(() => `${reports.length} items`, [reports.length])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/reports/run', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok || !payload?.report) {
        throw new Error(payload?.error || 'No fue posible generar el reporte.')
      }

      saveStoredReport(payload.report as ProspectReport)
      setReports(getStoredReports())
      router.push(`/cb-lab/reporting/${payload.report.id}`)
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'No fue posible generar el reporte.'
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

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="report-card rounded-[2rem] p-6 lg:p-8">
          <div className="mb-6 space-y-2">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
              nuevo reporte
            </p>
            <h2 className="font-['NeueMachina'] text-3xl leading-none">Cargar prospecto</h2>
            <p className="text-sm text-black/65">
              El análisis puede tardar entre 20 y 60 segundos si GTmetrix está activo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-black/70">Empresa / prospecto</span>
              <input
                type="text"
                name="companyName"
                required
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                placeholder="Maquinados Continental"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-black/70">URL del sitio</span>
              <input
                type="text"
                name="websiteUrl"
                required
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                placeholder="https://cliente.com"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Industria</span>
                <input
                  type="text"
                  name="industry"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  placeholder="Maquinados industriales"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Ciudad / plaza</span>
                <input
                  type="text"
                  name="city"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  placeholder="Monterrey"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Nombre de contacto</span>
                <input
                  type="text"
                  name="contactName"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  placeholder="Juan Pérez"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Teléfono</span>
                <input
                  type="text"
                  name="contactPhone"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  placeholder="+52 81 5555 5555"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Correo</span>
                <input
                  type="email"
                  name="contactEmail"
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                  placeholder="contacto@empresa.com"
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-black/70">CTA principal</span>
              <input
                type="text"
                name="primaryCta"
                defaultValue="WhatsApp"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-black/70">Notas opcionales</span>
              <textarea
                name="notes"
                rows={4}
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#1F00FF]"
                placeholder="Ángulo comercial, prioridad o contexto del prospecto."
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-full bg-[#1F00FF] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? 'Generando reporte...' : 'Generar dashboard y reportes'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="report-card rounded-[2rem] p-6 lg:p-8">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
              stack
            </p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">PageSpeed Insights</p>
                <p className="mt-2 text-lg text-black">Activo</p>
                <p className="mt-2 text-sm text-black/65">
                  Base del reporte. Se consulta en móvil y desktop. Si vas a usarlo en producción,
                  conviene definir `PAGESPEED_API_KEY` en Vercel.
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">GTmetrix</p>
                <p className="mt-2 text-lg text-black">
                  {gtmetrixConfigured ? 'Configurado' : 'Opcional'}
                </p>
                <p className="mt-2 text-sm text-black/65">
                  {gtmetrixConfigured
                    ? 'Enriquece la lectura con métricas adicionales y enlaces al reporte externo.'
                    : 'Actívalo con GTMETRIX_API_KEY para sumar métricas, timings y enlaces al reporte.'}
                </p>
              </div>
              <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black/60">Salida</p>
                <p className="mt-2 text-lg text-black">Dashboard + 2 PDFs</p>
                <p className="mt-2 text-sm text-black/65">
                  Hook report de 1 página y reporte ejecutivo de 4 páginas en modo print.
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
                  Dashboards guardados
                </h2>
                <p className="mt-2 text-sm text-black/60">
                  Se conservan en este navegador para que puedas revisarlos después.
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
                        <h3 className="mt-2 text-lg">{report.input.companyName}</h3>
                        <p className="mt-1 text-sm text-black/60">{report.input.websiteUrl}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/cb-lab/reporting/${report.id}`}
                          className="rounded-full border border-black px-3 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={`/cb-lab/reporting/${report.id}/hook`}
                          className="rounded-full border border-black px-3 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
                        >
                          Hook PDF
                        </Link>
                        <Link
                          href={`/cb-lab/reporting/${report.id}/full`}
                          className="rounded-full bg-[#1F00FF] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-black"
                        >
                          Full PDF
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-3xl border border-dashed border-black/15 px-4 py-6 text-sm text-black/55">
                  Los reportes se guardan en este navegador para evitar el problema de persistencia
                  de Vercel. Genera el primero para empezar.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
