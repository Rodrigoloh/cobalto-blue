import { notFound } from 'next/navigation'

import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import { formatMilliseconds, formatScore } from '@/lib/performance-report'
import { readReport } from '@/lib/report-storage'

type HookPageProps = {
  params: {
    id: string
  }
}

export default async function HookReportPage({ params }: HookPageProps) {
  const report = await readReport(params.id)

  if (!report) {
    notFound()
  }

  const mobile = report.pagespeed.mobile
  const desktop = report.pagespeed.desktop

  return (
    <main className="report-shell min-h-screen px-6 py-6 text-[#111111]">
      <ReportPrintActions />

      <section className="report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-12">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-8">
            <div className="flex flex-col gap-4 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                  cobalto.blue performance hook
                </p>
                <h1 className="mt-4 max-w-3xl font-['NeueMachina'] text-4xl leading-none md:text-6xl">
                  {report.input.companyName}
                </h1>
                <p className="mt-3 text-sm text-black/55">{report.input.websiteUrl}</p>
              </div>

              <div className="rounded-[1.75rem] bg-[#111111] px-6 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">health score</p>
                <p className="mt-2 font-['NeueMachina'] text-5xl leading-none">{report.overallScore}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[1.75rem] bg-[#111111] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/55">lectura comercial</p>
                <p className="mt-4 text-2xl leading-tight">{report.hookSummary}</p>
              </div>

              <div className="rounded-[1.75rem] border border-black/10 bg-white/70 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-black/45">señal rápida</p>
                <p className="mt-4 text-base text-black/70">
                  {report.costOfInaction}
                </p>
              </div>
            </div>

            {(report.input.contactName || report.input.contactPhone || report.input.contactEmail) ? (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Contacto</p>
                  <p className="mt-3 text-xl">{report.input.contactName || 'N/D'}</p>
                </div>
                <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Teléfono</p>
                  <p className="mt-3 text-xl">{report.input.contactPhone || 'N/D'}</p>
                </div>
                <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/45">Correo</p>
                  <p className="mt-3 text-xl break-all">{report.input.contactEmail || 'N/D'}</p>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">PSI Mobile</p>
                <p className="mt-3 text-4xl">{formatScore(mobile?.performanceScore ?? null)}</p>
                <p className="mt-3 text-sm text-black/60">
                  LCP {formatMilliseconds(mobile?.largestContentfulPaint ?? null)}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">PSI Desktop</p>
                <p className="mt-3 text-4xl">{formatScore(desktop?.performanceScore ?? null)}</p>
                <p className="mt-3 text-sm text-black/60">
                  SEO {formatScore(desktop?.seoScore ?? null)}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-black/10 bg-white/75 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">Estado</p>
                <p className="mt-3 text-4xl">{report.healthStatus}</p>
                <p className="mt-3 text-sm text-black/60">
                  Listo para una conversación comercial clara.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-black/10 bg-white/70 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-black/45">lo que está pasando</p>
                <ul className="mt-4 space-y-3 text-sm text-black/70">
                  {report.findings.slice(0, 2).map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] bg-[#1F00FF] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">movimientos rápidos</p>
                <ul className="mt-4 space-y-3 text-sm text-white/90">
                  {report.proposals.slice(0, 2).map((proposal) => (
                    <li key={proposal}>{proposal}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.2em] text-black/45">
            <span>Reporte de hook para cierre comercial</span>
            <span>cobalto.blue</span>
          </div>
        </div>
      </section>
    </main>
  )
}
