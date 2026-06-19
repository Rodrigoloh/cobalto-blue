'use client'

import type { ReactNode } from 'react'
import { Code2, LineChart, MapPinned, Monitor, Radio, Smartphone } from 'lucide-react'

import { ReportBrowserState } from '@/components/private/ReportBrowserState'
import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import type { FinancialImpact } from '@/lib/performance-report'
import {
  formatCLS,
  formatMilliseconds,
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

function FooterLogo({ light = false }: { light?: boolean }) {
  return (
    <img
      src={light ? '/brand/logo-main-fullwhite.png' : '/brand/logo-main-blue.png'}
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

function PageSpeedMock({
  score,
  fcp,
  lcp,
  tbt,
  cls,
  speedIndex
}: {
  score: number
  fcp: string
  lcp: string
  tbt: string
  cls: string
  speedIndex: string
}) {
  const dash = Math.max(0, Math.min(100, score))

  return (
    <div className="mt-[22px] flex h-[322px] bg-white">
      <div className="flex w-[300px] flex-col items-center justify-center border-r border-black/10">
        <div
          className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full text-[22px] text-[#f59e0b]"
          style={{
            background: `conic-gradient(#f59e0b ${dash * 3.6}deg, #fff1d6 0deg)`
          }}
        >
          <div className="absolute inset-[7px] rounded-full bg-white" />
          <span className="relative">{score}</span>
        </div>
        <p className="mt-4 text-[13px] text-[#333333]">Performance</p>
        <p className="mt-2 max-w-[190px] text-center text-[8px] leading-tight text-[#777777]">
          Values are estimated and may vary. The performance score is calculated directly from these metrics.
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
            <MetricRow label="First Contentful Paint" value={fcp} />
            <MetricRow label="Total Blocking Time" value={tbt} tone="good" />
            <MetricRow label="Speed Index" value={speedIndex} tone="ok" />
          </div>
          <div>
            <MetricRow label="Largest Contentful Paint" value={lcp} />
            <MetricRow label="Cumulative Layout Shift" value={cls} tone="good" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3 bg-[#f5f5f5] px-4 py-3 text-[10px] text-[#666666]">
          <span>Captured by PageSpeed</span>
          <span>Emulated mobile device</span>
          <span>Single page session</span>
          <span>Initial page load</span>
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
        const score = report.overallScore || mobile?.performanceScore || 65
        const firstFinding = report.findings[0] ?? report.hookSummary
        const secondFinding = report.findings[1] ?? report.costOfInaction
        const company = report.input.companyName || 'Empresa analizada'
        const city = report.input.city || 'su mercado'
        const industry = report.input.industry || 'su industria'
        const cta = report.input.primaryCta || 'contacto comercial'

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
                    <p>
                      La experiencia de {company} en {industry} se ve limitada digitalmente por una estructura que no comunica con la velocidad que el mercado espera en {city}.
                    </p>
                    <p>
                      El sitio web actua como un catalogo estatico, desaprovechando su potencial de conversion corporativa y limitando el flujo activo de adquisicion.
                    </p>
                  </TextBlock>
                  <TextBlock icon={<Radio className="h-8 w-8" />} title="Inconsistencia en Conversion">
                    <p>{firstFinding}</p>
                    <p>
                      La ausencia de rutas claras hacia {cta} diluye la prospeccion y reduce la confianza de compradores que buscan respuesta inmediata.
                    </p>
                  </TextBlock>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="pt-[68px]">
                <div className="px-[58px]">
                  <Title>Rendimiento y Core Web Vitals</Title>
                </div>
                <PageSpeedMock
                  score={score}
                  fcp={formatMilliseconds(mobile?.firstContentfulPaint ?? null)}
                  lcp={formatMilliseconds(mobile?.largestContentfulPaint ?? null)}
                  tbt={formatMilliseconds(mobile?.totalBlockingTime ?? null)}
                  cls={formatCLS(mobile?.cumulativeLayoutShift ?? null)}
                  speedIndex={formatMilliseconds(mobile?.speedIndex ?? null)}
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
                    Resolver discrepancias de nombre, ubicacion y servicio para unificar la huella digital de {company} en buscadores locales.
                  </StepCard>
                  <StepCard icon={<Code2 className="h-11 w-11" />} title="Estructuracion de Datos">
                    Implementacion nativa de marcado JSON-LD para optimizar la indexacion por buscadores e inteligencias artificiales.
                  </StepCard>
                  <StepCard icon={<LineChart className="h-12 w-12" />} title="Limpieza Indexable">
                    Eliminacion de rutas fantasma e inconsistencias de URL para maximizar crawling y fortalecer la confianza de entidad.
                  </StepCard>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Plan de Trabajo Estrategico</Title>
                <Lead>Consistencia de Datos &amp; SEO Semantico</Lead>
                <div className="absolute left-[98px] right-[112px] top-[336px] h-[3px] bg-[#2500ff]" />
                {[
                  ['Fase 1', 'Rediseno & Migracion', 'Transicion a una arquitectura agil para estructurar codigo limpio y semantico de manera nativa.', 205, 369],
                  ['Fase 2', 'AI-Ready Metadata', 'Integracion de marcado JSON-LD preciso unificando identidad corporativa, ubicacion y horarios extendidos.', 405, 210],
                  ['Fase 3', 'CRO & Captacion B2B', `Modulo y flujo de conversion enfocado en ${cta}, velocidad de respuesta y seguimiento comercial.`, 632, 369],
                  ['Fase 4', 'Optimizacion WPO', 'Conversion grafica moderna, cache, CDN y configuracion tecnica orientada a rendimiento.', 864, 210]
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
