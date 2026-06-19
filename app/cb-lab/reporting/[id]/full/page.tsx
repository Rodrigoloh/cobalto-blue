'use client'

import type { ReactNode } from 'react'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import type { FinancialImpact } from '@/lib/performance-report'
import {
  formatCLS,
  formatMilliseconds,
  formatScore,
  getScoreStateLabel,
  getScoreTone
} from '@/lib/performance-report'

type FullPageProps = {
  params: {
    id: string
  }
}

type Tone = 'green' | 'amber' | 'red' | 'neutral'

function currency(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`
}

function toneClasses(tone: Tone) {
  switch (tone) {
    case 'green':
      return 'bg-emerald-500 text-emerald-700 border-emerald-200'
    case 'amber':
      return 'bg-amber-400 text-amber-800 border-amber-200'
    case 'red':
      return 'bg-red-500 text-red-700 border-red-200'
    default:
      return 'bg-neutral-300 text-neutral-700 border-neutral-200'
  }
}

function scoreTextColor(score: number | null) {
  const tone = getScoreTone(score)
  if (tone === 'green') return 'text-emerald-600'
  if (tone === 'amber') return 'text-amber-600'
  if (tone === 'red') return 'text-red-600'
  return 'text-neutral-600'
}

function Page({
  number,
  label,
  children,
  dark = false
}: {
  number: string
  label: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <section
      className={`report-export-page report-page mt-6 flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-10 ${
        dark ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]'
      }`}
    >
      <div>{children}</div>
      <footer
        className={`mt-8 flex items-center justify-between border-t pt-5 text-[11px] uppercase tracking-[0.22em] ${
          dark ? 'border-white/15 text-white/50' : 'border-black/10 text-black/45'
        }`}
      >
        <span>{number} - {label}</span>
        <span>cobalto.blue</span>
      </footer>
    </section>
  )
}

function Kpi({
  label,
  value,
  helper,
  dark = false
}: {
  label: string
  value: string
  helper: string
  dark?: boolean
}) {
  return (
    <div className={`rounded-[1.25rem] border p-5 ${dark ? 'border-white/15 bg-white/5' : 'border-black/10 bg-black/[0.03]'}`}>
      <p className={`text-[11px] uppercase tracking-[0.2em] ${dark ? 'text-white/48' : 'text-black/45'}`}>{label}</p>
      <p className="mt-3 font-['NeueMachina'] text-3xl leading-none">{value}</p>
      <p className={`mt-3 text-sm leading-relaxed ${dark ? 'text-white/64' : 'text-black/60'}`}>{helper}</p>
    </div>
  )
}

function ScoreBlock({
  label,
  score,
  helper
}: {
  label: string
  score: number | null
  helper: string
}) {
  return (
    <div className="rounded-[1.25rem] border border-black/10 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">{label}</p>
        <span className={`h-3 w-3 rounded-full ${toneClasses(getScoreTone(score)).split(' ')[0]}`} />
      </div>
      <p className={`mt-4 font-['NeueMachina'] text-4xl leading-none ${scoreTextColor(score)}`}>
        {formatScore(score)}
      </p>
      <p className="mt-3 text-sm text-black/60">{helper}</p>
    </div>
  )
}

function MoneyFlow({ impact }: { impact: FinancialImpact }) {
  const rows = [
    ['Visitas mensuales', impact.monthlyVisits.toLocaleString('es-MX')],
    ['Conversion base', percent(impact.conversionRate)],
    ['Friccion estimada', percent(impact.frictionRate)],
    ['Leads perdidos al mes', impact.lostLeadsMonthly.toLocaleString('es-MX')]
  ]

  return (
    <div className="rounded-[1.5rem] bg-[#111111] p-6 text-white">
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">formula utilizada</p>
      <div className="mt-5 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm text-white/60">{label}</span>
            <span className="font-['NeueMachina'] text-xl">{value}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-white/55">{impact.assumption}</p>
    </div>
  )
}

export default function FullReportPage({ params }: FullPageProps) {
  return (
    <ReportBrowserState id={params.id}>
      {(report) => {
        const mobile = report.pagespeed.mobile
        const desktop = report.pagespeed.desktop
        const impact = report.financialImpact ?? {
          monthlyVisits: 1500,
          averageTicket: 15000,
          closeRate: 0.2,
          conversionRate: 0.025,
          frictionRate: 0.22,
          lostLeadsMonthly: 8.3,
          lostRevenueMonthly: 24900,
          lostRevenueAnnual: 298800,
          assumption:
            'Estimacion comercial: visitas mensuales x conversion base 2.5% x friccion tecnica x tasa de cierre x ticket promedio.'
        }

        return (
          <main className="report-shell min-h-screen px-6 py-6 text-[#111111]">
            <ReportPrintActions
              dashboardHref={`/cb-lab/reporting/${report.id}`}
              pdfTargetId="full-report-canvas"
              pdfFileName={`${report.input.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-reporte-completo.pdf`}
            />

            <div id="full-report-canvas">
              <Page number="01" label="diagnostico comercial" dark>
                <div className="flex items-start justify-between gap-6">
                  <img src="/brand/logo-main-fullwhite.png" alt="cobalto.blue" className="h-10 w-auto" />
                  <p className="max-w-xs text-right text-xs uppercase tracking-[0.24em] text-white/45">
                    Reporte de rendimiento web y dinero en riesgo
                  </p>
                </div>
                <div className="mt-24 max-w-4xl">
                  <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#7f72ff]">
                    analisis ejecutivo
                  </p>
                  <h1 className="mt-5 font-['NeueMachina'] text-6xl leading-[0.92]">
                    {report.input.companyName}
                  </h1>
                  <p className="mt-6 max-w-3xl text-2xl leading-tight text-white/78">
                    {report.hookSummary}
                  </p>
                </div>
                <div className="mt-16 grid gap-4 md:grid-cols-3">
                  <Kpi dark label="sitio analizado" value={report.input.websiteUrl.replace(/^https?:\/\//, '')} helper="URL consultada en Google PageSpeed Insights." />
                  <Kpi dark label="estado actual" value={getScoreStateLabel(report.overallScore)} helper={`Score general: ${report.overallScore}/100.`} />
                  <Kpi dark label="dinero en riesgo" value={currency(impact.lostRevenueMonthly)} helper="Perdida mensual estimada por friccion digital." />
                </div>
              </Page>

              <Page number="02" label="pagespeed insights">
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      rendimiento actual
                    </p>
                    <h2 className="mt-5 font-['NeueMachina'] text-5xl leading-none">
                      Lo que Google ve antes que un cliente confie.
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-black/64">
                      {report.executiveSummary}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <ScoreBlock
                      label="PageSpeed mobile"
                      score={mobile?.performanceScore ?? null}
                      helper={`LCP ${formatMilliseconds(mobile?.largestContentfulPaint ?? null)} - TBT ${formatMilliseconds(mobile?.totalBlockingTime ?? null)}`}
                    />
                    <ScoreBlock
                      label="PageSpeed desktop"
                      score={desktop?.performanceScore ?? null}
                      helper={`SEO ${formatScore(desktop?.seoScore ?? null)} - Accesibilidad ${formatScore(desktop?.accessibilityScore ?? null)}`}
                    />
                  </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-4">
                  <Kpi label="FCP" value={formatMilliseconds(mobile?.firstContentfulPaint ?? null)} helper="Primer contenido visible." />
                  <Kpi label="LCP" value={formatMilliseconds(mobile?.largestContentfulPaint ?? null)} helper="Contenido principal visible." />
                  <Kpi label="TBT" value={formatMilliseconds(mobile?.totalBlockingTime ?? null)} helper="Tiempo de bloqueo." />
                  <Kpi label="CLS" value={formatCLS(mobile?.cumulativeLayoutShift ?? null)} helper="Estabilidad visual." />
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">fuente</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/62">
                    PageSpeed Insights: {report.sourceStatus.pagespeed ? 'activo y usado en el reporte' : report.sourceStatus.pagespeedMessage || 'sin datos'}.
                  </p>
                </div>
              </Page>

              <Page number="03" label="dinero en riesgo">
                <div className="grid gap-8 md:grid-cols-[1.08fr_0.92fr]">
                  <div>
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      costo de no actuar
                    </p>
                    <h2 className="mt-5 font-['NeueMachina'] text-5xl leading-none">
                      {currency(impact.lostRevenueAnnual)} al ano puede escaparse por friccion digital.
                    </h2>
                    <p className="mt-5 text-xl leading-tight text-black/70">
                      {report.costOfInaction}
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <Kpi label="perdida mensual" value={currency(impact.lostRevenueMonthly)} helper="Oportunidad comercial que no llega a ventas." />
                      <Kpi label="ticket promedio" value={currency(impact.averageTicket)} helper="Supuesto editable desde cb-lab." />
                      <Kpi label="tasa de cierre" value={percent(impact.closeRate)} helper="Porcentaje estimado de leads que compran." />
                      <Kpi label="leads perdidos" value={`${impact.lostLeadsMonthly}`} helper="Leads estimados que se pierden cada mes." />
                    </div>
                  </div>
                  <MoneyFlow impact={impact} />
                </div>
                <div className="mt-8 rounded-[1.5rem] border border-[#1F00FF]/25 bg-[#1F00FF]/5 p-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#1F00FF]">lectura para direccion</p>
                  <p className="mt-3 text-lg leading-relaxed text-black/70">
                    El monto no pretende sustituir analytics o CRM. Sirve para dimensionar el riesgo comercial mientras se valida con datos reales de trafico, ventas y origen de prospectos.
                  </p>
                </div>
              </Page>

              <Page number="04" label="hallazgos clave" dark>
                <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#7f72ff]">
                  donde se rompe la conversion
                </p>
                <h2 className="mt-5 font-['NeueMachina'] text-5xl leading-none">
                  Tres fricciones que frenan confianza, lectura y contacto.
                </h2>
                <div className="mt-10 grid gap-5">
                  {report.findings.map((finding, index) => (
                    <div key={finding} className="grid gap-5 rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-6 md:grid-cols-[90px_1fr]">
                      <p className="font-['NeueMachina'] text-5xl text-[#7f72ff]">0{index + 1}</p>
                      <p className="text-xl leading-relaxed text-white/78">{finding}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {report.healthRows.map((row) => (
                    <div key={row.metric} className="rounded-[1.25rem] border border-white/12 bg-white/[0.04] p-5">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">{row.state}</p>
                      <h3 className="mt-3 text-xl leading-tight">{row.metric}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/58">{row.impact}</p>
                    </div>
                  ))}
                </div>
              </Page>

              <Page number="05" label="nuevo diseno y estructura">
                <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      propuesta cobalto.blue
                    </p>
                    <h2 className="mt-5 font-['NeueMachina'] text-5xl leading-none">
                      Redisenar para que el sitio venda antes de pedir paciencia.
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-black/66">
                      La mejora no debe ser solo estetica. La estructura tiene que ordenar oferta, prueba, claridad tecnica y contacto para que el usuario avance sin friccion.
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {report.proposals.map((proposal, index) => (
                      <div key={proposal} className="rounded-[1.25rem] border border-black/10 bg-black/[0.03] p-5">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#1F00FF]">accion 0{index + 1}</p>
                        <p className="mt-3 text-lg leading-relaxed text-black/72">{proposal}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <Kpi label="estructura" value="Hero - Oferta - Prueba - CTA" helper="Orden pensado para comprender rapido y contactar." />
                  <Kpi label="performance" value="Imagenes + codigo ligero" helper="Menos peso visual innecesario y mejor carga inicial." />
                  <Kpi label="conversion" value={report.input.primaryCta || 'WhatsApp'} helper="CTA visible, directo y repetido en momentos clave." />
                </div>
              </Page>

              <Page number="06" label="roadmap">
                <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                      siguiente paso
                    </p>
                    <h2 className="mt-5 font-['NeueMachina'] text-5xl leading-none">
                      Convertir el diagnostico en una implementacion medible.
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-black/66">
                      El objetivo es salir de una pagina que informa tarde a una experiencia que explica, carga rapido y convierte con menos dudas.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#1F00FF] p-6 text-white">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">prioridad comercial</p>
                    <p className="mt-4 text-3xl leading-tight">
                      Recuperar hasta {currency(impact.lostRevenueMonthly)} mensuales exige atacar velocidad, claridad y contacto en el mismo sprint.
                    </p>
                  </div>
                </div>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  <Kpi label="01 auditoria" value="1 semana" helper="Validar contenido, performance, SEO base y mensajes comerciales." />
                  <Kpi label="02 diseno" value="1-2 semanas" helper="Nueva arquitectura, wireframes y look aplicado a pantallas clave." />
                  <Kpi label="03 build" value="2-4 semanas" helper="Implementacion, medicion, QA y publicacion con base escalable." />
                </div>
                <div className="mt-10 rounded-[1.5rem] border border-black/10 bg-black/[0.03] p-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">contacto del prospecto</p>
                  <div className="mt-4 grid gap-3 text-sm text-black/64 md:grid-cols-3">
                    <p>{report.input.contactName || 'Sin nombre capturado'}</p>
                    <p>{report.input.contactPhone || 'Sin telefono capturado'}</p>
                    <p className="break-all">{report.input.contactEmail || 'Sin correo capturado'}</p>
                  </div>
                </div>
              </Page>
            </div>
          </main>
        )
      }}
    </ReportBrowserState>
  )
}
