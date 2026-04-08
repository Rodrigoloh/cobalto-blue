'use client'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import {
  formatBytes,
  formatCLS,
  formatMilliseconds,
  formatScore
} from '@/lib/performance-report'

type FullPageProps = {
  params: {
    id: string
  }
}

function InfoCard({
  label,
  value,
  helper
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-black/45">{label}</p>
      <p className="mt-3 text-4xl">{value}</p>
      <p className="mt-3 text-sm text-black/60">{helper}</p>
    </div>
  )
}

export default function FullReportPage({ params }: FullPageProps) {
  return (
    <ReportBrowserState id={params.id}>
      {(report) => {
        const mobile = report.pagespeed.mobile
        const desktop = report.pagespeed.desktop
        const gtmetrix = report.gtmetrix

        return (
          <main className="report-shell min-h-screen px-6 py-6 text-[#111111]">
            <ReportPrintActions />

            <section className="report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      cobalto.blue executive performance report
                    </p>
                    <h1 className="max-w-4xl font-['NeueMachina'] text-5xl leading-none md:text-7xl">
                      {report.input.companyName}
                    </h1>
                    <p className="max-w-3xl text-base text-black/70 md:text-lg">
                      {report.hookSummary}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[2rem] bg-[#111111] p-7 text-white">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/55">
                        resumen ejecutivo
                      </p>
                      <p className="mt-4 text-2xl leading-tight">{report.executiveSummary}</p>
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/45">URL</p>
                        <p className="mt-3 text-lg text-black">{report.input.websiteUrl}</p>
                      </div>
                      <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6">
                        <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                          salud actual
                        </p>
                        <p className="mt-3 font-['NeueMachina'] text-5xl leading-none">
                          {report.overallScore}
                        </p>
                        <p className="mt-3 text-sm text-black/60">{report.healthStatus}</p>
                      </div>
                      {report.input.contactName ||
                      report.input.contactPhone ||
                      report.input.contactEmail ? (
                        <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6">
                          <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                            contacto
                          </p>
                          <p className="mt-3 text-base text-black">
                            {report.input.contactName || 'N/D'}
                          </p>
                          <p className="mt-1 text-sm text-black/60">
                            {report.input.contactPhone || 'N/D'}
                          </p>
                          <p className="mt-1 text-sm break-all text-black/60">
                            {report.input.contactEmail || 'N/D'}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <InfoCard
                      label="PSI Mobile"
                      value={formatScore(mobile?.performanceScore ?? null)}
                      helper={`LCP ${formatMilliseconds(mobile?.largestContentfulPaint ?? null)}`}
                    />
                    <InfoCard
                      label="PSI Desktop"
                      value={formatScore(desktop?.performanceScore ?? null)}
                      helper={`SEO ${formatScore(desktop?.seoScore ?? null)}`}
                    />
                    <InfoCard
                      label="GTmetrix"
                      value={formatScore(gtmetrix?.performanceScore ?? null)}
                      helper={`Fully loaded ${formatMilliseconds(gtmetrix?.fullyLoadedTime ?? null)}`}
                    />
                    <InfoCard
                      label="Estabilidad"
                      value={formatCLS(
                        mobile?.cumulativeLayoutShift ?? gtmetrix?.cumulativeLayoutShift ?? null
                      )}
                      helper="CLS de referencia"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.2em] text-black/45">
                  <span>01 · Overview</span>
                  <span>cobalto.blue</span>
                </div>
              </div>
            </section>

            <section className="report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                    02 · estado de salud actual
                  </p>
                  <div className="mt-8 grid gap-5">
                    {report.healthRows.map((row) => (
                      <div
                        key={row.metric}
                        className="rounded-[1.75rem] border border-black/10 bg-white/75 p-6"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                              métrica
                            </p>
                            <h2 className="mt-2 text-2xl">{row.metric}</h2>
                          </div>
                          <p className="rounded-full bg-black px-4 py-2 text-sm uppercase tracking-[0.18em] text-white">
                            {row.emoji} {row.state}
                          </p>
                        </div>
                        <p className="mt-4 max-w-4xl text-base text-black/68">{row.impact}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <InfoCard
                      label="LCP"
                      value={formatMilliseconds(
                        mobile?.largestContentfulPaint ?? gtmetrix?.largestContentfulPaint ?? null
                      )}
                      helper="Tiempo hasta el contenido principal"
                    />
                    <InfoCard
                      label="TBT"
                      value={formatMilliseconds(
                        mobile?.totalBlockingTime ?? gtmetrix?.totalBlockingTime ?? null
                      )}
                      helper="Bloqueo del hilo principal"
                    />
                    <InfoCard
                      label="Peso"
                      value={formatBytes(gtmetrix?.pageBytes ?? null)}
                      helper="Referencia del tamaño total"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.2em] text-black/45">
                  <span>02 · Current health</span>
                  <span>cobalto.blue</span>
                </div>
              </div>
            </section>

            <section className="report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="grid gap-6 md:grid-cols-[1.02fr_0.98fr]">
                  <div className="rounded-[2rem] bg-[#111111] p-7 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/55">
                      hallazgos clave
                    </p>
                    <div className="mt-6 space-y-5">
                      {report.findings.map((finding) => (
                        <div
                          key={finding}
                          className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                        >
                          <p className="text-base leading-relaxed text-white/88">{finding}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                    <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                      el costo de no actuar
                    </p>
                    <p className="mt-6 text-2xl leading-tight text-black">
                      {report.costOfInaction}
                    </p>

                    <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-black px-6 py-5 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">
                        lectura técnica
                      </p>
                      <p className="mt-3 text-lg text-white/90">{report.technicalSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.2em] text-black/45">
                  <span>03 · Findings and business impact</span>
                  <span>cobalto.blue</span>
                </div>
              </div>
            </section>

            <section className="report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[2rem] bg-[#1F00FF] p-7 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                      propuesta de optimización rápida
                    </p>
                    <div className="mt-6 space-y-4">
                      {report.proposals.map((proposal) => (
                        <div
                          key={proposal}
                          className="rounded-[1.5rem] border border-white/15 bg-white/5 p-5"
                        >
                          <p className="text-base leading-relaxed text-white/92">{proposal}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                      <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                        fuentes utilizadas
                      </p>
                      <div className="mt-5 space-y-4 text-sm text-black/68">
                        <p>
                          PageSpeed Insights:{' '}
                          {report.sourceStatus.pagespeed
                            ? 'Activo'
                            : report.sourceStatus.pagespeedMessage || 'Sin datos'}
                        </p>
                        <p>
                          GTmetrix:{' '}
                          {report.sourceStatus.gtmetrix
                            ? 'Activo'
                            : report.sourceStatus.gtmetrixMessage}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-black/10 bg-white/75 p-7">
                      <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                        siguiente paso sugerido
                      </p>
                      <p className="mt-4 text-2xl leading-tight text-black">
                        Convertir este diagnóstico en una hoja de ruta de implementación rápida con
                        foco en percepción, velocidad y conversión.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.2em] text-black/45">
                  <span>04 · Action plan</span>
                  <span>cobalto.blue</span>
                </div>
              </div>
            </section>
          </main>
        )
      }}
    </ReportBrowserState>
  )
}
