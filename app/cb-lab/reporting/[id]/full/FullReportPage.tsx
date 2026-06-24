'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Code2, LineChart, MapPinned, Monitor, Radio, Smartphone } from 'lucide-react'

import { ReportPrintActions } from '@/components/private/ReportPrintActions'
import {
  formatCLS,
  formatMilliseconds,
  getScoreTone
} from '@/lib/performance-report'
import fullReportMockData from './mock-data.json'

type FullPageProps = {
  mockData?: any
}

type ApiMetric = {
  value: string
  raw: number | null
}

type ApiPageSpeedData = {
  performanceScore: number | null
  accessibilityScore: number | null
  bestPracticesScore: number | null
  seoScore: number | null
  fcp: ApiMetric
  lcp: ApiMetric
  tbt: ApiMetric
  cls: ApiMetric
  speedIndexMetric: ApiMetric
  capturedAt?: string | null
  emulatedDevice?: string | null
  sessionType?: string | null
  loadType?: string | null
  throttling?: string | null
  browserEngine?: string | null
}

function normalizeMockData(value: any) {
  const geminiJson = value?.geminiJson && typeof value.geminiJson === 'object' ? value.geminiJson : value
  const input = value?.input && typeof value.input === 'object' ? value.input : {}
  const pagespeed = value?.pagespeed && typeof value.pagespeed === 'object' ? value.pagespeed : {}

  return {
    ...input,
    ...geminiJson,
    ...value,
    geminiJson: {
      ...input,
      ...geminiJson
    },
    pagespeed: {
      ...pagespeed,
      mobile: pagespeed.mobile && typeof pagespeed.mobile === 'object' ? pagespeed.mobile : null,
      desktop: pagespeed.desktop && typeof pagespeed.desktop === 'object' ? pagespeed.desktop : null
    },
    findings: Array.isArray(value?.findings)
      ? value.findings
      : Array.isArray(geminiJson?.findings)
        ? geminiJson.findings
        : [],
    id: value?.id || 'mock-report',
    overallScore: typeof value?.overallScore === 'number' ? value.overallScore : 0,
    hookSummary: value?.hookSummary || geminiJson?.hookSummary || '',
    costOfInaction: value?.costOfInaction || geminiJson?.costOfInaction || '',
    technicalSummary: value?.technicalSummary || geminiJson?.technicalSummary || ''
  }
}

function toScore(value: unknown) {
  if (typeof value !== 'number' || Number.isNaN(value)) return null
  return Math.max(0, Math.min(100, Math.round(value)))
}

function normalizeApiMetric(value: any, fallbackRaw: number | null, formatter: (value: number | null) => string): ApiMetric {
  if (value && typeof value === 'object') {
    const raw = typeof value.raw === 'number' ? value.raw : fallbackRaw
    return {
      value: typeof value.value === 'string' ? value.value : formatter(raw),
      raw
    }
  }

  return {
    value: formatter(fallbackRaw),
    raw: fallbackRaw
  }
}

function normalizeApiPageSpeedData(value: any, fallbackAudit?: any): ApiPageSpeedData | null {
  const source = value && typeof value === 'object' ? value : null
  const audit = fallbackAudit && typeof fallbackAudit === 'object' ? fallbackAudit : null

  if (!source && !audit) {
    return null
  }

  return {
    performanceScore: toScore(source?.performanceScore ?? audit?.performanceScore),
    accessibilityScore: toScore(source?.accessibilityScore ?? audit?.accessibilityScore),
    bestPracticesScore: toScore(source?.bestPracticesScore ?? audit?.bestPracticesScore),
    seoScore: toScore(source?.seoScore ?? audit?.seoScore),
    fcp: normalizeApiMetric(source?.fcp, audit?.firstContentfulPaint ?? null, formatMilliseconds),
    lcp: normalizeApiMetric(source?.lcp, audit?.largestContentfulPaint ?? null, formatMilliseconds),
    tbt: normalizeApiMetric(source?.tbt, audit?.totalBlockingTime ?? null, formatMilliseconds),
    cls: normalizeApiMetric(source?.cls, audit?.cumulativeLayoutShift ?? null, formatCLS),
    speedIndexMetric: normalizeApiMetric(
      source?.speedIndexMetric,
      audit?.speedIndex ?? null,
      formatMilliseconds
    ),
    capturedAt: source?.capturedAt ?? audit?.capturedAt ?? null,
    emulatedDevice: source?.emulatedDevice ?? audit?.emulatedDevice ?? null,
    sessionType: source?.sessionType ?? audit?.sessionType ?? null,
    loadType: source?.loadType ?? audit?.loadType ?? null,
    throttling: source?.throttling ?? audit?.throttling ?? null,
    browserEngine: source?.browserEngine ?? audit?.browserEngine ?? null
  }
}

function defaultApiPageSpeedData(): ApiPageSpeedData {
  const emptyMetric = { value: 'N/D', raw: 0 }

  return {
    performanceScore: 0,
    accessibilityScore: 0,
    bestPracticesScore: 0,
    seoScore: 0,
    fcp: emptyMetric,
    lcp: emptyMetric,
    tbt: emptyMetric,
    cls: emptyMetric,
    speedIndexMetric: emptyMetric,
    capturedAt: null,
    emulatedDevice: null,
    sessionType: null,
    loadType: null,
    throttling: null,
    browserEngine: null
  }
}

function getConfiguredWebsiteUrl(data: any, geminiJson: any) {
  const raw = data.websiteUrl || geminiJson.websiteUrl || ''

  return typeof raw === 'string' ? raw.trim() : ''
}

function hasConfiguredWebsite(data: any, geminiJson: any) {
  const websiteUrl = getConfiguredWebsiteUrl(data, geminiJson)

  return Boolean(
    geminiJson.hasExistingWebsite !== false &&
      websiteUrl &&
      websiteUrl !== 'NO_CONFIGURADA'
  )
}

function reportDateStamp(date = new Date()) {
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = String(date.getFullYear()).slice(-2)

  return `${day}${month}${year}`
}

function reportFileName(companyName: string, reportType: string) {
  const company = companyName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${company || 'Reporte'}_${reportType}_cobaltoblue_${reportDateStamp()}.pdf`
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
      style={{
        backgroundColor: blue ? '#2500ff' : '#eeeeee',
        color: blue ? '#ffffff' : '#111827'
      }}
    >
      {children}
    </section>
  )
}

function FooterLogo() {
  return (
    <img
      src="/brand/logo-mobile-cobalto-blue.svg"
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
      <div className="space-y-7 text-[19px] leading-[1.14] text-[#444444]">{children}</div>
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
  metrics
}: {
  scores: Array<{ label: string; score: number | null }>
  metrics: {
    fcp: { value: string; raw: number | null }
    lcp: { value: string; raw: number | null }
    tbt: { value: string; raw: number | null }
    cls: { value: string; raw: number | null }
    speedIndex: { value: string; raw: number | null }
  }
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
        <div className="mb-2 flex items-center justify-center text-[12px] font-bold text-[#666666]">
          <span className="border-b-2 border-[#4285f4] pb-2 text-[#4285f4]"><Smartphone className="mr-1 inline h-4 w-4" /> Mobile</span>
        </div>
        <div className="flex items-center justify-between border-b border-black/8 pb-2 text-[10px] uppercase text-[#777777]">
          <span>Metrics</span>
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
      </div>
    </div>
  )
}

function PageSpeedSkeleton() {
  return (
    <div className="mt-[22px] flex h-[322px] bg-white">
      <div className="flex w-[382px] flex-col items-center justify-center border-r border-black/10 px-7">
        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-5">
          {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="h-[86px] w-[86px] rounded-full bg-[#e5e7eb]" />
              <div className="mt-3 h-[12px] w-[82px] bg-[#e5e7eb]" />
            </div>
          ))}
        </div>
        <div className="mt-4 h-[10px] w-[180px] bg-[#e5e7eb]" />
      </div>

      <div className="flex-1 px-6 py-5">
        <div className="mb-5 flex items-center justify-center">
          <div className="h-[24px] w-[96px] bg-[#e5e7eb]" />
        </div>
        <div className="grid grid-cols-2 gap-x-9 pt-3">
          {[0, 1].map((column) => (
            <div key={column} className="space-y-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="border-b border-black/5 pb-3">
                  <div className="h-[10px] w-[150px] bg-[#e5e7eb]" />
                  <div className="ml-7 mt-3 h-[24px] w-[92px] bg-[#e5e7eb]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FullReportPage({ mockData = fullReportMockData }: FullPageProps) {
  const data = normalizeMockData(mockData)
  const geminiJson = data.geminiJson
  const initialApiPageSpeedData = useMemo(
    () => normalizeApiPageSpeedData(data.apiPageSpeedData, data.pagespeed.mobile),
    [data.apiPageSpeedData, data.pagespeed.mobile]
  )
  const [apiPageSpeedData, setApiPageSpeedData] = useState<ApiPageSpeedData | null>(
    initialApiPageSpeedData
  )
  const [isPageSpeedLoading, setIsPageSpeedLoading] = useState(!initialApiPageSpeedData)
  const company = geminiJson.companyName || 'Empresa analizada'
  const websiteUrl = getConfiguredWebsiteUrl(data, geminiJson)
  const shouldRenderPageSpeedSlide = hasConfiguredWebsite(data, geminiJson)
  const cta = geminiJson.primaryCta || 'contacto comercial'
  const costoOportunidadPage =
    geminiJson.costo_oportunidad_page && typeof geminiJson.costo_oportunidad_page === 'object'
      ? geminiJson.costo_oportunidad_page
      : {}
  const visionGeneralP1 = geminiJson.visionGeneralP1 || ''
  const visionGeneralP2 = geminiJson.visionGeneralP2 || ''
  const visionUxP1 = geminiJson.visionUxP1 || ''
  const visionUxP2 = geminiJson.visionUxP2 || ''
  const opportunityAreasP1 = geminiJson.opportunityAreasP1 || ''
  const opportunityAreasP2 = geminiJson.opportunityAreasP2 || ''
  const inconsistenciesP1 = geminiJson.inconsistenciesP1 || ''
  const inconsistenciesP2 = geminiJson.inconsistenciesP2 || ''
  const nextStepsSubtitle = geminiJson.nextStepsSubtitle || ''
  const nextStepOneTitle = geminiJson.nextStepOneTitle || ''
  const nextStepOneText = geminiJson.nextStepOneText || geminiJson.nextStepNapText || ''
  const nextStepTwoTitle = geminiJson.nextStepTwoTitle || ''
  const nextStepTwoText = geminiJson.nextStepTwoText || geminiJson.nextStepDataText || ''
  const nextStepThreeTitle = geminiJson.nextStepThreeTitle || ''
  const nextStepThreeText = geminiJson.nextStepThreeText || geminiJson.nextStepIndexText || ''
  const workPlanSubtitle = geminiJson.workPlanSubtitle || ''
  const phaseOneTitle = geminiJson.phaseOneTitle || ''
  const phaseTwoTitle = geminiJson.phaseTwoTitle || ''
  const phaseThreeTitle = geminiJson.phaseThreeTitle || ''
  const phaseFourTitle = geminiJson.phaseFourTitle || ''
  const phaseOneText = geminiJson.phaseOneText || ''
  const phaseTwoText = geminiJson.phaseTwoText || ''
  const phaseThreeText = geminiJson.phaseThreeText || ''
  const phaseFourText = geminiJson.phaseFourText || ''
  const pageSpeedDetails = [
    formatCaptureDate(apiPageSpeedData?.capturedAt),
    apiPageSpeedData?.emulatedDevice ?? 'Emulated Moto G Power with Lighthouse',
    apiPageSpeedData?.sessionType ?? 'Single page session',
    apiPageSpeedData?.loadType ?? 'Initial page load',
    apiPageSpeedData?.throttling ?? 'Slow 4G throttling'
  ]
  const browserEngineDetail = apiPageSpeedData?.browserEngine
    ? apiPageSpeedData.browserEngine.replace(/^Using\s+/i, '')
    : 'HeadlessChromium'

  useEffect(() => {
    const websiteUrl = getConfiguredWebsiteUrl(data, geminiJson)

    if (!hasConfiguredWebsite(data, geminiJson)) {
      setApiPageSpeedData(defaultApiPageSpeedData())
      setIsPageSpeedLoading(false)
      return
    }

    if (initialApiPageSpeedData) {
      setIsPageSpeedLoading(false)
      return
    }

    let cancelled = false

    async function loadPageSpeed() {
      setIsPageSpeedLoading(true)

      try {
        const response = await fetch('/api/reports/pagespeed', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ websiteUrl })
        })
        const payload = await response.json().catch(() => null)

        if (!response.ok || !payload?.apiPageSpeedData) {
          throw new Error(payload?.error || 'No fue posible consultar PageSpeed.')
        }

        if (!cancelled) {
          setApiPageSpeedData(normalizeApiPageSpeedData(payload.apiPageSpeedData))
        }
      } catch {
        if (!cancelled) {
          setApiPageSpeedData(null)
        }
      } finally {
        if (!cancelled) {
          setIsPageSpeedLoading(false)
        }
      }
    }

    loadPageSpeed()

    return () => {
      cancelled = true
    }
  }, [data.websiteUrl, geminiJson.websiteUrl, geminiJson.hasExistingWebsite, initialApiPageSpeedData])

  return (
          <main className="report-shell min-h-screen px-6 py-6 text-[#111827]">
            <ReportPrintActions
              dashboardHref="https://www.cobalto.blue/cb-lab/reporting"
              pdfTargetId="full-report-canvas"
              pdfFileName={reportFileName(company, 'ReporteCompleto')}
            />

            <div id="full-report-canvas" data-pdf-format="deck">
              <DeckPage blue className="px-[88px] pt-[128px]">
                <img
                  src="/brand/logo-main-fullwhite.png"
                  alt="cobalto.blue"
                  className="absolute left-[88px] top-[132px] h-[116px] w-auto max-w-none"
                />
                <div className="mt-[168px] max-w-[620px]">
                  <p className="text-[18px] uppercase tracking-[0.02em] text-white/72">
                    ANALISIS TECNICO DE RENDIMIENTO
                  </p>
                  <h1 className="mt-3 text-[37px] font-bold leading-none text-white">{company}</h1>
                  <p className="mt-3 break-all text-[18px] leading-tight text-white/70">
                    {shouldRenderPageSpeedSlide ? websiteUrl : 'Sin sitio web registrado'}
                  </p>
                  <p className="mt-6 text-[23px] leading-[1.12] text-white/86">
                    Auditoria web, diagnostico de Core Web Vitals e inyeccion estrategica de datos semanticos para la preparacion de motores de IA (AI-Ready).
                  </p>
                </div>
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Vision General y UX</Title>
                <div className="mt-[50px] grid grid-cols-2 gap-[62px]">
                  <TextBlock icon={<Monitor className="h-8 w-8" />} title="Vision General">
                    <p>{visionGeneralP1}</p>
                    <p>{visionGeneralP2}</p>
                  </TextBlock>
                  <TextBlock icon={<Radio className="h-8 w-8" />} title="Inconsistencias de UX">
                    <p>{visionUxP1}</p>
                    <p>{visionUxP2}</p>
                  </TextBlock>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Enfoque Tecnico/Conversion</Title>
                <div className="mt-[50px] grid grid-cols-2 gap-[62px]">
                  <TextBlock icon={<LineChart className="h-8 w-8" />} title="Areas de oportunidad">
                    <p>{opportunityAreasP1}</p>
                    <p>{opportunityAreasP2}</p>
                  </TextBlock>
                  <TextBlock icon={<Radio className="h-8 w-8" />} title="Inconsistencias Tecnicas y SEO">
                    <p>{inconsistenciesP1}</p>
                    <p>{inconsistenciesP2}</p>
                  </TextBlock>
                </div>
                <FooterLogo />
              </DeckPage>

              {shouldRenderPageSpeedSlide ? (
                <DeckPage className="pt-[68px]">
                  <div className="px-[58px]">
                    <Title>Rendimiento y Core Web Vitals</Title>
                  </div>
                  {isPageSpeedLoading || !apiPageSpeedData ? (
                    <PageSpeedSkeleton />
                  ) : (
                    <PageSpeedMock
                      scores={[
                        { label: 'Performance', score: apiPageSpeedData.performanceScore },
                        { label: 'Accessibility', score: apiPageSpeedData.accessibilityScore },
                        { label: 'Best Practices', score: apiPageSpeedData.bestPracticesScore },
                        { label: 'SEO', score: apiPageSpeedData.seoScore }
                      ]}
                      metrics={{
                        fcp: apiPageSpeedData.fcp,
                        lcp: apiPageSpeedData.lcp,
                        tbt: apiPageSpeedData.tbt,
                        cls: apiPageSpeedData.cls,
                        speedIndex: apiPageSpeedData.speedIndexMetric
                      }}
                    />
                  )}
                  <p className="mx-[58px] mt-[14px] text-[14px] leading-[1.25] text-[#1f2937]">
                    El informe de <b>PageSpeed Insights</b> evidencia friccion en el rendimiento movil. El punto critico aparece en el <b>Largest Contentful Paint (LCP)</b>, la carga percibida y el tiempo que tarda el usuario en entender la oferta principal.
                  </p>
                  <div className="absolute bottom-[28px] left-[58px] w-[690px] bg-[#f5f5f5] px-3 py-2 text-[8px] leading-tight text-[#666666]">
                    <div className="grid grid-cols-5 gap-x-3">
                      {pageSpeedDetails.map((detail) => (
                        <span key={detail} className="truncate">{detail}</span>
                      ))}
                    </div>
                    <p className="mt-1 truncate text-[7px] text-[#777777]">
                      Browser: {browserEngineDetail}
                    </p>
                  </div>
                  <FooterLogo />
                </DeckPage>
              ) : null}

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>{costoOportunidadPage.titulo || ''}</Title>
                <div className="mt-[43px] grid grid-cols-[590px_1fr] gap-[70px]">
                  <div>
                    <Lead>{costoOportunidadPage.subtitulo || ''}</Lead>
                    <div className="mt-5 space-y-5 text-[18px] leading-[1.18] text-[#444444]">
                      <p>
                        {costoOportunidadPage.p1_trafico || ''}
                      </p>
                      <p>
                        {costoOportunidadPage.p2_friccion || ''}
                      </p>
                      <p>
                        {costoOportunidadPage.p3_impacto || ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center pb-[40px] text-center">
                    <p className="text-[60px] font-bold leading-none text-[#ff007a]">
                      {costoOportunidadPage.texto_grande_monto || ''}
                    </p>
                    <p className="mt-4 text-[23px] font-bold text-[#ff007a]">
                      {costoOportunidadPage.texto_grande_moneda || ''}
                    </p>
                    <p className="mt-5 max-w-[320px] text-[11px] leading-tight text-[#64748b]">
                      {costoOportunidadPage.texto_pequeno_pie ||
                        costoOportunidadPage.texto_pequeño_pie ||
                        ''}
                    </p>
                  </div>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Pasos a seguir</Title>
                <Lead>{nextStepsSubtitle}</Lead>
                <div className="mt-[45px] grid grid-cols-3 gap-[58px]">
                  <StepCard icon={<MapPinned className="h-11 w-11" />} title={nextStepOneTitle}>
                    {nextStepOneText}
                  </StepCard>
                  <StepCard icon={<Code2 className="h-11 w-11" />} title={nextStepTwoTitle}>
                    {nextStepTwoText}
                  </StepCard>
                  <StepCard icon={<LineChart className="h-12 w-12" />} title={nextStepThreeTitle}>
                    {nextStepThreeText}
                  </StepCard>
                </div>
                <FooterLogo />
              </DeckPage>

              <DeckPage className="px-[58px] pt-[68px]">
                <Title>Plan de Trabajo Estrategico</Title>
                <Lead>{workPlanSubtitle}</Lead>
                <div className="relative mx-auto mt-[62px] h-[295px] w-[875px]">
                  <div className="absolute left-0 right-0 top-[134px] h-[3px] bg-[#2500ff]" />
                  {[
                    { phase: 'Fase 1', name: phaseOneTitle, text: phaseOneText, left: '12%', position: 'bottom' },
                    { phase: 'Fase 2', name: phaseTwoTitle, text: phaseTwoText, left: '35%', position: 'top' },
                    { phase: 'Fase 3', name: phaseThreeTitle, text: phaseThreeText, left: '62%', position: 'bottom' },
                    { phase: 'Fase 4', name: phaseFourTitle, text: phaseFourText, left: '88%', position: 'top' }
                  ].map((item) => (
                    <div key={item.phase}>
                      <div
                        className="absolute top-[121px] h-[28px] w-[28px] -translate-x-1/2 rounded-full border-2 border-[#666666] bg-[#eeeeee]"
                        style={{ left: item.left }}
                      />
                      <div
                        className={`absolute w-[250px] -translate-x-1/2 text-center ${
                          item.position === 'top' ? 'bottom-[178px]' : 'top-[166px]'
                        }`}
                        style={{ left: item.left }}
                      >
                        <h3 className="text-[20px] font-bold text-[#2500ff]">{item.phase}</h3>
                        <p className="mt-2 text-[13px] font-bold leading-tight text-[#111827]">{item.name}</p>
                        <p className="mt-2 text-[13px] leading-tight text-[#111827]">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
}
