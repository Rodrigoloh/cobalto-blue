'use client'

import type { ReactNode } from 'react'
import { Code2, LineChart, MapPinned, Monitor, Radio, Smartphone } from 'lucide-react'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import type { FinancialImpact } from '@/lib/performance-report'
import {
  formatCLS,
  formatMilliseconds,
  getScoreTone,
  getScoreStateLabel
} from '@/lib/performance-report'

type FullPageProps = {
  params: {
    id: string
  }
}

const BLUE = '#2500ff'
const PINK = '#ff007a'
const PAGE_BG = '#eeeeee'

function currency(value: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value)
}

function compactCurrency(value: number) {
  return currency(value).replace('MXN', '').trim()
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`
}

function defaultImpact(): FinancialImpact {
  return {
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
}

function slugFileName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function DeckPage({
  children,
  blue = false,
  className = ''
}: {
  children: ReactNode
  blue?: boolean
  className?: string
}) {
  return (
    <section
      className={`report-export-page relative mx-auto mt-6 h-[608px] w-[1080px] overflow-hidden ${
        blue ? 'bg-[#2500ff] text-white' : 'bg-[#eeeeee] text-[#111827]'
      } ${className}`}
    >
      {children}
    </section>
  )
}

function FooterLogo() {
  return (
    <img
      src="/brand/logo-main-fullwhite.png"
      alt="cobalto.blue"
      className="absolute bottom-[30px] right-[50px] h-[38px] w-auto"
    />
  )
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-['NeueMachina'] text-[40px] leading-none text-[#2500ff]">
      {children}
    </h2>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-[23px] font-bold leading-tight text-[#111827]">{children}</p>
}

function TextBlock({
  icon,
  title,
  children
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative pl-[30px]">
      <div className="absolute left-0 top-[44px] h-[230px] w-[2px] bg-[#2500ff]" />
      <div className="mb-4 flex items-center gap-3 text-[#111827]">
        <div className="text-[#2500ff]">{icon}</div>
        <h3 className="text-[23px] font-bold leading-tight">{title}</h3>
      </div>
      <div className="space-y-7 text-[20px] leading-[1.14] text-[#444444]">{children}</div>
    </div>
  )
}

function StepCard({
  icon,
  title,
  children
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative min-h-[230px] pl-[18px]">
      <div className="absolute left-0 top-[28px] h-[230px] w-[2px] bg-[#2500ff]" />
      <div className="mb-5 h-[44px] text-[#2500ff]">{icon}</div>
      <h3 className="text-[20px] font-bold leading-tight text-[#2500ff]">{title}</h3>
      <p className="mt-3 text-[20px] leading-[1.18] text-[#444444]">{children}</p>
    </div>
  )
}

function MetricRow({
  label,
  value,
  tone = 'bad'
}: {
  label: string
  value: string
  tone?: 'bad' | 'good' | 'ok'
}) {
  const color = tone === 'good' ? '#14a44d' : tone === 'ok' ? '#f4a51c' : '#e10600'
  const marker = tone === 'good' ? '●' : tone === 'ok' ? '■' : '▲'
  return (
    <div className="border-b border-black/5 py-2">
      <p className="text-[10px] font-bold text-[#555555]">
        <span style={{ color }}>{marker}</span> <span className="ml-2">{label}</span>
      </p>
      <p className="ml-7 mt-1 text-[20px]" style={{ color }}>
        {value}
      </p>
    </div>
  )
}

function scoreColor(score: number | null) {
  const tone = getScoreTone(score)
  if (tone === 'green') return '#14a44d'
  if (tone === 'amber') return '#f59e0b'
  if (tone === 'red') return '#e10600'
  return '#9ca3af'
}

function scoreSoftColor(score: number | null) {
  const tone = getScoreTone(score)
  if (tone === 'green') return '#e8f5ee'
  if (tone === 'amber') return '#fff1d6'
  if (tone === 'red') return '#fde8e8'
  return '#eeeeee'
}

function ScoreCircle({
  label,
  score
}: {
  label: string
  score: number | null
}) {
  const value = score ?? 0
  const color = scoreColor(score)
  const soft = scoreSoftColor(score)

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[86px] w-[86px] items-center justify-center rounded-full text-[21px]"
        style={{
          color,
          background: `conic-gradient(${color} ${value * 3.6}deg, ${soft} 0deg)`
        }}
      >
        <div className="absolute inset-[7px] rounded-full bg-white" />
        <span className="relative">{score ?? 'N/D'}</span>
      </div>
      <p className="mt-3 text-center text-[13px] text-[#333333]">{label}</p>
    </div>
  )
}

function formatCaptureDate(value: string | null | undefined) {
  if (!value) return 'Captured by PageSpeed'

  return `Captured at ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(new Date(value))}`
}

function metricTone(metric: 'FCP' | 'LCP' | 'TBT' | 'CLS' | 'SI', value: number | null) {
  if (value === null) return 'ok'
  if (metric === 'FCP') return value <= 1800 ? 'good' : value <= 3000 ? 'ok' : 'bad'
  if (metric === 'LCP') return value <= 2500 ? 'good' : value <= 4000 ? 'ok' : 'bad'
  if (metric === 'TBT') return value <= 200 ? 'good' : value <= 600 ? 'ok' : 'bad'
  if (metric === 'CLS') return value <= 0.1 ? 'good' : value <= 0.25 ? 'ok' : 'bad'
  return value <= 3400 ? 'good' : value <= 5800 ? 'ok' : 'bad'
}

function PageSpeedMock({
  scores,
  metrics,
  details
}: {
  scores: Array<{ label: string; score: number | null }>
  metrics: {
    fcp: { value: string; raw: number | null }
    lcp: { value: string; raw: number | null }
    tbt: { value: string; raw: number | null }
    cls: { value: string; raw: number | null }
    speedIndex: { value: string; raw: number | null }
  }
  details: string[]
}) {
  return (
    <div className="mt-[22px] flex h-[322px] bg-white">
      <div className="flex w-[382px] flex-col items-center justify-center border-r border-black/10 px-7">
        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-5">
          {scores.map((item) => (
            <ScoreCircle key={item.label} label={item.label} score={item.score} />
          ))}
        </div>
        <p className="mt-2 max-w-[190px] text-center text-[8px] leading-tight text-[#777777]">
          Values are estimated and may vary. Scores are calculated by Lighthouse diagnostics.
        </p>
        <div className="mt-4 flex gap-5 text-[8px] text-[#555555]">
          <span><span className="text-red-500">▲</span> 0-49</span>
          <span><span className="text-amber-500">■</span> 50-89</span>
          <span><span className="text-green-500">●</span> 90-100</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-5">
        <div className="mb-2 flex items-center justify-center gap-8 text-[12px] font-bold text-[#666666]">
          <span className="border-b-2 border-[#4285f4] pb-2 text-[#4285f4]"><Smartphone className="mr-1 inline h-4 w-4" /> Mobile</span>
          <span><Monitor className="mr-1 inline h-4 w-4" /> Desktop</span>
        </div>
        <div className="flex items-center justify-between border-b border-black/8 pb-2 text-[10px] uppercase text-[#777777]">
          <span>Metrics</span>
          <span>Expand view</span>
        </div>
        <div className="grid grid-cols-2 gap-x-9 pt-1">
          <div>
            <MetricRow label="First Contentful Paint" value={metrics.fcp.value} tone={metricTone('FCP', metrics.fcp.raw)} />
            <MetricRow label="Total Blocking Time" value={metrics.tbt.value} tone={metricTone('TBT', metrics.tbt.raw)} />
            <MetricRow label="Speed Index" value={metrics.speedIndex.value} tone={metricTone('SI', metrics.speedIndex.raw)} />
          </div>
          <div>
            <MetricRow label="Largest Contentful Paint" value={metrics.lcp.value} tone={metricTone('LCP', metrics.lcp.raw)} />
            <MetricRow label="Cumulative Layout Shift" value={metrics.cls.value} tone={metricTone('CLS', metrics.cls.raw)} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-x-5 gap-y-2 bg-[#f5f5f5] px-4 py-3 text-[9px] leading-tight text-[#666666]">
          {details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FullReportPage({ params }: FullPageProps) {
  return (
    <ReportBrowserState id={params.id}>
      {(report) => {
        const mobile = report.pagespeed.mobile
        const impact = report.financialImpact ?? defaultImpact()
        const weeklyLoss = Math.round(impact.lostRevenueMonthly / 4)
        const weeklyVisitors = Math.max(10, Math.round(impact.monthlyVisits / 4))
        const firstFinding = report.findings[0] ?? report.hookSummary
        const secondFinding = report.findings[1] ?? report.costOfInaction
        const company = report.input.companyName || 'Empresa analizada'
        const city = report.input.city || 'su mercado'
        const industry = report.input.industry || 'su industria'
        const cta = report.input.primaryCta || 'contacto comercial'
        const visionImpactText =
          report.input.visionImpactText ||
          `La experiencia de ${company} en ${industry} se ve limitada digitalmente por una estructura que no comunica con la velocidad que el mercado espera en ${city}.`
        const visionImpactTextSecondary =
          report.input.visionImpactTextSecondary ||
          'El sitio web actua como un catalogo estatico, desaprovechando su potencial de conversion corporativa y limitando el flujo activo de adquisicion.'
        const visionConversionText = report.input.visionConversionText || firstFinding
        const visionConversionTextSecondary =
          report.input.visionConversionTextSecondary ||
          secondFinding ||
          `La ausencia de rutas claras hacia ${cta} diluye la prospeccion y reduce la confianza de compradores que buscan respuesta inmediata.`
        const nextStepNapText =
          report.input.nextStepNapText ||
          `Resolver discrepancias de nombre, ubicacion y servicio para unificar la huella digital de ${company} en buscadores locales.`
        const nextStepDataText =
          report.input.nextStepDataText ||
          'Implementacion nativa de marcado JSON-LD para optimizar la indexacion por buscadores e inteligencias artificiales.'
        const nextStepIndexText =
          report.input.nextStepIndexText ||
          'Eliminacion de rutas fantasma e inconsistencias de URL para maximizar crawling y fortalecer la confianza de entidad.'
        const phaseOneText =
          report.input.phaseOneText ||
          'Transicion a una arquitectura agil para estructurar codigo limpio y semantico de manera nativa.'
        const phaseTwoText =
          report.input.phaseTwoText ||
          'Integracion de marcado JSON-LD preciso unificando identidad corporativa, ubicacion y horarios extendidos.'
        const phaseThreeText =
          report.input.phaseThreeText ||
          `Modulo y flujo de conversion enfocado en ${cta}, velocidad de respuesta y seguimiento comercial.`
        const phaseFourText =
          report.input.phaseFourText ||
          'Conversion grafica moderna, cache, CDN y configuracion tecnica orientada a rendimiento.'
        const pageSpeedDetails = [
          formatCaptureDate(mobile?.capturedAt),
          mobile?.emulatedDevice ?? 'Emulated Moto G Power with Lighthouse',
          mobile?.sessionType ?? 'Single page session',
          mobile?.loadType ?? 'Initial page load',
          mobile?.throttling ?? 'Slow 4G throttling',
          mobile?.browserEngine ?? 'Using HeadlessChromium with lr'
        ]

        return (
          <main className="report-shell min-h-screen px-6 py-6 text-[#111827]">
            <ReportPrintActions
              dashboardHref={`/cb-lab/reporting/${report.id}`}
              pdfTargetId="full-report-canvas"
              pdfFileName={`${slugFileName(company)}-reporte-completo.pdf`}
            />

            <div id="full-report-canvas" data-pdf-format="deck">
              <DeckPage blue className="px-[88px] pt-[128px]">
                <img src="/brand/logo-main-fullwhite.png" alt="cobalto.blue" className="h-[49px] w-auto" />
                <div className="mt-[148px] max-w-[610px]">
                  <p className="text-[20px] uppercase tracking-[0.02em] text-white/72">
                    ANALISIS TECNICO DE RENDIMIENTO
                  </p>
                  <h1 className="mt-4 text-[39px] font-bold leading-none text-white">{company}</h1>
                  <p className="mt-6 text-[24px] leading-[1.12] text-white/86">
                    Auditoria web, diagnostico de Core Web Vitals e inyeccion estrategica de datos semanticos para la preparacion de motores de IA (AI-Ready).
                  </p>
                </div>
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Vision General y UX</Title>
                <div className="mt-[50px] grid grid-cols-2 gap-[62px]">
                  <TextBlock icon={<Monitor className="h-8 w-8" />} title="Huella Digital e Impacto">
                    <p>{visionImpactText}</p>
                    <p>{visionImpactTextSecondary}</p>
                  </TextBlock>
                  <TextBlock icon={<Radio className="h-8 w-8" />} title="Inconsistencia en Conversion">
                    <p>{visionConversionText}</p>
                    <p>{visionConversionTextSecondary}</p>
                  </TextBlock>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="pt-[68px]">
                <div className="px-[58px]">
                  <Title>Rendimiento y Core Web Vitals</Title>
                </div>
                <PageSpeedMock
                  scores={[
                    { label: 'Performance', score: mobile?.performanceScore ?? report.overallScore },
                    { label: 'Accessibility', score: mobile?.accessibilityScore ?? null },
                    { label: 'Best Practices', score: mobile?.bestPracticesScore ?? null },
                    { label: 'SEO', score: mobile?.seoScore ?? null }
                  ]}
                  metrics={{
                    fcp: {
                      value: formatMilliseconds(mobile?.firstContentfulPaint ?? null),
                      raw: mobile?.firstContentfulPaint ?? null
                    },
                    lcp: {
                      value: formatMilliseconds(mobile?.largestContentfulPaint ?? null),
                      raw: mobile?.largestContentfulPaint ?? null
                    },
                    tbt: {
                      value: formatMilliseconds(mobile?.totalBlockingTime ?? null),
                      raw: mobile?.totalBlockingTime ?? null
                    },
                    cls: {
                      value: formatCLS(mobile?.cumulativeLayoutShift ?? null),
                      raw: mobile?.cumulativeLayoutShift ?? null
                    },
                    speedIndex: {
                      value: formatMilliseconds(mobile?.speedIndex ?? null),
                      raw: mobile?.speedIndex ?? null
                    }
                  }}
                  details={pageSpeedDetails}
                />
                <p className="mx-[58px] mt-[14px] text-[14px] leading-[1.25] text-[#1f2937]">
                  El informe de <b>PageSpeed Insights</b> evidencia friccion en el rendimiento movil. El punto critico aparece en el <b>Largest Contentful Paint (LCP)</b>, la carga percibida y el tiempo que tarda el usuario en entender la oferta principal.
                </p>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Costo de Oportunidad Semanal</Title>
                <div className="mt-[43px] grid grid-cols-[590px_1fr] gap-[70px]">
                  <div>
                    <Lead>¿Como se escapa este capital?</Lead>
                    <div className="mt-5 space-y-5 text-[18px] leading-[1.18] text-[#444444]">
                      <p>
                        <b>Trafico Frustrado:</b> De aproximadamente ~{weeklyVisitors.toLocaleString('es-MX')} visitantes que llegan semanalmente, una parte abandona la pagina por velocidad de carga movil, rutas poco claras o baja percepcion de confianza.
                      </p>
                      <p>
                        <b>Friccion en la Cotizacion:</b> Al no contar con un flujo directo hacia {cta}, los clientes comparan contra competidores que ofrecen respuestas mas claras y agiles en linea.
                      </p>
                      <p>
                        <b>El Impacto Real:</b> Una perdida estimada de {impact.lostLeadsMonthly.toLocaleString('es-MX')} leads al mes. Con un ticket promedio de <b>{currency(impact.averageTicket)}</b> y una tasa de cierre de <b>{percent(impact.closeRate)}</b>, el costo de inactividad supera <b>{currency(impact.lostRevenueMonthly)} mensuales</b>.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center pb-[40px] text-center">
                    <p className="text-[60px] font-bold leading-none text-[#ff007a]">
                      -{compactCurrency(weeklyLoss)}
                    </p>
                    <p className="mt-4 text-[23px] font-bold text-[#ff007a]">MXN / SEMANA</p>
                    <p className="mt-5 max-w-[320px] text-[11px] leading-tight text-[#64748b]">
                      Perdida proyectada de flujo de capital no capturado por fugas en el embudo tecnico y de conversion digital.
                    </p>
                  </div>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Pasos a seguir</Title>
                <Lead>Consistencia de Datos &amp; SEO Semantico</Lead>
                <div className="mt-[45px] grid grid-cols-3 gap-[58px]">
                  <StepCard icon={<MapPinned className="h-11 w-11" />} title="Consolidacion NAP">
                    {nextStepNapText}
                  </StepCard>
                  <StepCard icon={<Code2 className="h-11 w-11" />} title="Estructuracion de Datos">
                    {nextStepDataText}
                  </StepCard>
                  <StepCard icon={<LineChart className="h-12 w-12" />} title="Limpieza Indexable">
                    {nextStepIndexText}
                  </StepCard>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Plan de Trabajo Estrategico</Title>
                <Lead>Consistencia de Datos &amp; SEO Semantico</Lead>
                <div className="absolute left-[98px] right-[112px] top-[336px] h-[3px] bg-[#2500ff]" />
                {[
                  ['Fase 1', 'Rediseno & Migracion', phaseOneText, 205, 369],
                  ['Fase 2', 'AI-Ready Metadata', phaseTwoText, 405, 210],
                  ['Fase 3', 'CRO & Captacion B2B', phaseThreeText, 632, 369],
                  ['Fase 4', 'Optimizacion WPO', phaseFourText, 864, 210]
                ].map(([phase, name, text, left, top]) => (
                  <div key={phase} className="absolute w-[260px] text-center" style={{ left: Number(left) - 130, top: Number(top) }}>
                    <h3 className="text-[20px] font-bold text-[#2500ff]">{phase}</h3>
                    <p className="mt-2 text-[13px] font-bold text-[#444444]">{name}</p>
                    <p className="mt-2 text-[13px] leading-tight text-[#444444]">{text}</p>
                  </div>
                ))}
                {[205, 405, 632, 864].map((left) => (
                  <div
                    key={left}
                    className="absolute top-[323px] h-[28px] w-[28px] rounded-full border-2 border-[#666666] bg-[#eeeeee]"
                    style={{ left: left - 14 }}
                  />
                ))}
                <FooterLogo />
              </DeckPage>

              <DeckPage blue>
                <div className="flex h-full flex-col items-center justify-center pb-[34px]">
                  <img src="/brand/logo-main-fullwhite.png" alt="cobalto.blue" className="h-[91px] w-auto" />
                  <p className="-mt-1 text-[26px] font-bold text-white/62">Construyamos algo juntos</p>
                </div>
                <p className="absolute bottom-[46px] left-[46px] text-[18px] text-white">hey@cobalto.blue</p>
                <p className="absolute bottom-[46px] right-[50px] text-[16px] font-bold text-white">+52 1 81 8208 5411</p>
              </DeckPage>
            </div>
          </main>
        )
      }}
    </ReportBrowserState>
  )
}
