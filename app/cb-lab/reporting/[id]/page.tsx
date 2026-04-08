import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  formatBytes,
  formatCLS,
  formatMilliseconds,
  formatScore
} from '@/lib/performance-report'
import { readReport } from '@/lib/report-storage'

type ReportPageProps = {
  params: {
    id: string
  }
}

function scoreTone(score: number) {
  if (score < 40) return 'text-red-600'
  if (score < 70) return 'text-amber-600'
  return 'text-emerald-600'
}

export default async function ReportDetailPage({ params }: ReportPageProps) {
  const report = await readReport(params.id)

  if (!report) {
    notFound()
  }

  const mobile = report.pagespeed.mobile
  const desktop = report.pagespeed.desktop
  const gtmetrix = report.gtmetrix

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
                    Estado: {report.healthStatus}
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
          </div>

          <div className="space-y-6">
            <div className="report-card rounded-[2rem] p-6 lg:p-8">
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                métricas clave
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">PSI Mobile</p>
                  <p className="mt-2 text-3xl">{formatScore(mobile?.performanceScore ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    LCP {formatMilliseconds(mobile?.largestContentfulPaint ?? null)} · TBT{' '}
                    {formatMilliseconds(mobile?.totalBlockingTime ?? null)}
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
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">GTmetrix</p>
                  <p className="mt-2 text-3xl">{formatScore(gtmetrix?.performanceScore ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    Fully loaded {formatMilliseconds(gtmetrix?.fullyLoadedTime ?? null)} · Peso{' '}
                    {formatBytes(gtmetrix?.pageBytes ?? null)}
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Estabilidad</p>
                  <p className="mt-2 text-3xl">{formatCLS(mobile?.cumulativeLayoutShift ?? gtmetrix?.cumulativeLayoutShift ?? null)}</p>
                  <p className="mt-3 text-sm text-black/60">
                    CLS de referencia y consistencia visual durante la carga.
                  </p>
                </div>
              </div>
            </div>

            {(report.input.contactName || report.input.contactPhone || report.input.contactEmail) ? (
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
                fuentes
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4 text-sm text-black/65">
                  <p className="font-semibold text-black">PageSpeed Insights</p>
                  <p className="mt-2">
                    {report.sourceStatus.pagespeed
                      ? 'Activo y usado en el reporte.'
                      : report.sourceStatus.pagespeedMessage || 'Sin datos.'}
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4 text-sm text-black/65">
                  <p className="font-semibold text-black">GTmetrix</p>
                  <p className="mt-2">
                    {report.sourceStatus.gtmetrix
                      ? 'Activo y usado para enriquecer métricas.'
                      : report.sourceStatus.gtmetrixMessage}
                  </p>
                  {gtmetrix?.reportUrl ? (
                    <a
                      href={gtmetrix.reportUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full border border-black px-3 py-2 text-xs uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
                    >
                      Abrir GTmetrix
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
