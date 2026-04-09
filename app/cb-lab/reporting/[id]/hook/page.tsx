'use client'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import {
  MetricStatus,
  formatCLS,
  formatMilliseconds,
  formatScore,
  getScoreStateLabel,
  getScoreTone,
  getWebVitalStatus
} from '@/lib/performance-report'

type HookPageProps = {
  params: {
    id: string
  }
}

function getToneClasses(tone: 'green' | 'amber' | 'red' | 'neutral') {
  switch (tone) {
    case 'green':
      return {
        bg: 'bg-emerald-500',
        soft: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
      }
    case 'amber':
      return {
        bg: 'bg-amber-400',
        soft: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200'
      }
    case 'red':
      return {
        bg: 'bg-red-500',
        soft: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200'
      }
    default:
      return {
        bg: 'bg-neutral-300',
        soft: 'bg-neutral-50',
        text: 'text-neutral-700',
        border: 'border-neutral-200'
      }
  }
}

function getStatusClasses(status: MetricStatus) {
  switch (status) {
    case 'good':
      return getToneClasses('green')
    case 'warning':
      return getToneClasses('amber')
    case 'critical':
      return getToneClasses('red')
    default:
      return getToneClasses('neutral')
  }
}

function getVitalHelp(metric: 'FCP' | 'LCP' | 'TBT' | 'CLS' | 'SI') {
  switch (metric) {
    case 'FCP':
      return 'Cuándo aparece el primer contenido visible.'
    case 'LCP':
      return 'Cuándo se ve el contenido principal.'
    case 'TBT':
      return 'Cuánto tiempo se siente ocupado el navegador.'
    case 'CLS':
      return 'Qué tanto se mueven los elementos al cargar.'
    case 'SI':
      return 'Qué tan rápido se llena visualmente la página.'
  }
}

function VitalCard({
  metric,
  value,
  helper,
  raw
}: {
  metric: 'FCP' | 'LCP' | 'TBT' | 'CLS' | 'SI'
  value: string
  helper: string
  raw: number | null
}) {
  const status = getWebVitalStatus(metric, raw)
  const classes = getStatusClasses(status)
  return (
    <div className={`hook-vital-card rounded-[1.35rem] border ${classes.border} ${classes.soft} p-4`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.22em] text-black/45">{metric}</p>
        <span className={`h-3 w-3 rounded-full ${classes.bg}`} />
      </div>
      <p className={`mt-3 text-2xl ${classes.text}`}>{value}</p>
      <p className="mt-2 text-[11px] leading-snug text-black/58">{helper}</p>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const tone = getScoreTone(score)
  const classes = getToneClasses(tone)
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const progress = Math.max(0, Math.min(100, score))
  const dashOffset = circumference - (progress / 100) * circumference

  return (
    <div className="hook-score-ring relative h-[124px] w-[124px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} strokeWidth="12" className="fill-none stroke-black/8" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="12"
          strokeLinecap="round"
          className={`fill-none ${tone === 'green' ? 'stroke-emerald-500' : tone === 'amber' ? 'stroke-amber-400' : 'stroke-red-500'}`}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`${classes.text} text-4xl leading-none`}
          style={{ fontFamily: 'Arial Black, Arial, sans-serif' }}
        >
          {score}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/45">
          {getScoreStateLabel(score)}
        </span>
      </div>
    </div>
  )
}

function ScoreCard({
  label,
  score,
  helper
}: {
  label: string
  score: number | null
  helper: string
}) {
  const tone = getScoreTone(score)
  const classes = getToneClasses(tone)
  return (
    <div className={`hook-score-card rounded-[1.5rem] border ${classes.border} ${classes.soft} p-5`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.22em] text-black/45">{label}</p>
        <span className={`h-3 w-3 rounded-full ${classes.bg}`} />
      </div>
      <p className={`mt-3 text-4xl ${classes.text}`}>{formatScore(score)}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-black/45">
        {getScoreStateLabel(score)}
      </p>
      <p className="mt-3 text-sm text-black/62">{helper}</p>
    </div>
  )
}

export default function HookReportPage({ params }: HookPageProps) {
  return (
    <ReportBrowserState id={params.id}>
      {(report) => {
        const mobile = report.pagespeed.mobile
        const desktop = report.pagespeed.desktop
        const vitalRows = [
          {
            metric: 'FCP' as const,
            raw: mobile?.firstContentfulPaint ?? null,
            value: formatMilliseconds(mobile?.firstContentfulPaint ?? null)
          },
          {
            metric: 'LCP' as const,
            raw: mobile?.largestContentfulPaint ?? null,
            value: formatMilliseconds(mobile?.largestContentfulPaint ?? null)
          },
          {
            metric: 'TBT' as const,
            raw: mobile?.totalBlockingTime ?? null,
            value: formatMilliseconds(mobile?.totalBlockingTime ?? null)
          },
          {
            metric: 'CLS' as const,
            raw: mobile?.cumulativeLayoutShift ?? null,
            value: formatCLS(mobile?.cumulativeLayoutShift ?? null)
          },
          {
            metric: 'SI' as const,
            raw: mobile?.speedIndex ?? null,
            value: formatMilliseconds(mobile?.speedIndex ?? null)
          }
        ]

        return (
          <main className="report-shell min-h-screen px-6 py-6 text-[#111111]">
            <ReportPrintActions
              dashboardHref={`/cb-lab/reporting/${report.id}`}
              pdfTargetId="hook-report-canvas"
              pdfFileName={`${report.input.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-hook.pdf`}
            />

            <section id="hook-report-canvas" className="hook-onepage report-page report-card mt-6 rounded-[2.25rem] p-8 md:p-10">
              <div className="hook-onepage-inner flex h-full flex-col justify-between gap-8">
                <div className="hook-stack space-y-6">
                  <div className="hook-header flex items-start justify-between gap-6 border-b border-black/10 pb-6">
                    <div className="hook-brand space-y-4">
                      <img
                        src="/brand/logo-main-blue.png"
                        alt="cobalto.blue"
                        className="hook-logo h-9 w-auto"
                      />
                      <div>
                        <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                          Cobalto Blue Reporte de rendimiento OnePager
                        </p>
                        <h1 className="hook-company mt-3 max-w-3xl font-['NeueMachina'] text-3xl leading-none md:text-4xl">
                          {report.input.companyName}
                        </h1>
                        <div className="hook-meta mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-black/55">
                          <span>{report.input.websiteUrl}</span>
                          {report.input.contactName ? <span>{report.input.contactName}</span> : null}
                          {report.input.contactPhone ? <span>{report.input.contactPhone}</span> : null}
                          {report.input.contactEmail ? (
                            <span className="break-all">{report.input.contactEmail}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="hook-overall min-w-[180px] p-1">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-black/45 text-right">
                        Overall score
                      </p>
                      <div className="mt-2 flex justify-end">
                        <ScoreRing score={report.overallScore} />
                      </div>
                    </div>
                  </div>

                  <div className="hook-two-up grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                    <div className="hook-dark-card rounded-[1.75rem] bg-[#111111] p-6 text-white">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/55">
                        lectura comercial
                      </p>
                      <p className="mt-4 text-xl leading-tight">{report.hookSummary}</p>
                    </div>

                    <div className="hook-light-card rounded-[1.75rem] border border-black/10 bg-white/75 p-6">
                      <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                        señal de negocio
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-black/70">
                        {report.costOfInaction}
                      </p>
                    </div>
                  </div>

                  <div className="hook-three-up grid gap-4 md:grid-cols-3">
                    <ScoreCard
                      label="PSI Mobile"
                      score={mobile?.performanceScore ?? null}
                      helper="El score principal sale de aquí: si cae en amarillo o rojo, el sitio necesita atención."
                    />
                    <ScoreCard
                      label="PSI Desktop"
                      score={desktop?.performanceScore ?? null}
                      helper="Una buena lectura desktop no compensa una experiencia móvil lenta."
                    />
                    <ScoreCard
                      label="Estado actual"
                      score={report.overallScore}
                      helper="Semáforo comercial para explicar rápido el nivel de atención."
                    />
                  </div>

                  <div className="hook-vitals space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                        rendimiento móvil explicado
                      </p>
                      <p className="text-xs text-black/45">
                        Referencia visual estilo semáforo
                      </p>
                    </div>
                    <div className="hook-vitals-grid grid gap-3 md:grid-cols-5">
                      {vitalRows.map((item) => {
                        return (
                          <VitalCard
                            key={item.metric}
                            metric={item.metric}
                            value={item.value}
                            helper={getVitalHelp(item.metric)}
                            raw={item.raw}
                          />
                        )
                      })}
                    </div>
                  </div>

                  <div className="hook-two-up grid gap-4 md:grid-cols-2">
                    <div className="hook-light-card rounded-[1.75rem] border border-black/10 bg-white/75 p-6">
                      <p className="text-xs uppercase tracking-[0.25em] text-black/45">
                        qué está pasando
                      </p>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-black/72">
                        {report.findings.slice(0, 2).map((finding) => (
                          <p key={finding}>{finding}</p>
                        ))}
                      </div>
                    </div>

                    <div className="hook-blue-card rounded-[1.75rem] bg-[#1F00FF] p-6 text-white">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/65">
                        acciones recomendadas
                      </p>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/92">
                        {report.proposals.slice(0, 3).map((proposal) => (
                          <p key={proposal}>{proposal}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hook-footer flex items-center justify-between border-t border-black/10 pt-5 text-[11px] uppercase tracking-[0.22em] text-black/45">
                  <span>OnePager comercial de rendimiento</span>
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
