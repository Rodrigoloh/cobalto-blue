import { randomUUID } from 'crypto'

export type MetricStatus = 'good' | 'warning' | 'critical' | 'unknown'
export type ScoreTone = 'green' | 'amber' | 'red' | 'neutral'

export type AuditSummary = {
  strategy: 'mobile' | 'desktop'
  performanceScore: number | null
  accessibilityScore: number | null
  bestPracticesScore: number | null
  seoScore: number | null
  firstContentfulPaint: number | null
  largestContentfulPaint: number | null
  totalBlockingTime: number | null
  cumulativeLayoutShift: number | null
  speedIndex: number | null
  interactionToNextPaint: number | null
  screenshot: string | null
  capturedAt: string | null
}

export type GTmetrixSummary = {
  reportId: string
  performanceScore: number | null
  structureScore: number | null
  grade: string | null
  largestContentfulPaint: number | null
  totalBlockingTime: number | null
  cumulativeLayoutShift: number | null
  speedIndex: number | null
  fullyLoadedTime: number | null
  timeToFirstByte: number | null
  pageBytes: number | null
  pageRequests: number | null
  reportUrl: string | null
  reportPdfUrl: string | null
  reportPdfFullUrl: string | null
  testedAt: string | null
}

export type HealthRow = {
  metric: string
  state: string
  emoji: string
  impact: string
}

export type ProspectInput = {
  companyName: string
  websiteUrl: string
  industry: string
  city: string
  contactName: string
  contactPhone: string
  contactEmail: string
  primaryCta: string
  notes: string
}

export type ProspectReport = {
  id: string
  createdAt: string
  input: ProspectInput
  overallScore: number
  healthStatus: string
  hookSummary: string
  executiveSummary: string
  technicalSummary: string
  pagespeed: {
    mobile: AuditSummary | null
    desktop: AuditSummary | null
  }
  gtmetrix: GTmetrixSummary | null
  healthRows: HealthRow[]
  findings: string[]
  costOfInaction: string
  proposals: string[]
  sourceStatus: {
    pagespeed: boolean
    pagespeedMessage: string | null
    gtmetrix: boolean
    gtmetrixMessage: string | null
  }
}

type GTmetrixResult =
  | { enabled: false; message: string }
  | { enabled: true; summary: GTmetrixSummary }

function clampScore(score: number | null) {
  if (score === null || Number.isNaN(score)) {
    return null
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

function toScore(value: unknown) {
  if (typeof value !== 'number') {
    return null
  }

  return clampScore(value * 100)
}

function toRoundedNumber(value: unknown, digits = 0) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return null
  }

  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

function normalizePageSpeed(strategy: 'mobile' | 'desktop', payload: any): AuditSummary {
  const lighthouse = payload?.lighthouseResult ?? {}
  const categories = lighthouse.categories ?? {}
  const audits = lighthouse.audits ?? {}

  return {
    strategy,
    performanceScore: toScore(categories.performance?.score),
    accessibilityScore: toScore(categories.accessibility?.score),
    bestPracticesScore: toScore(categories['best-practices']?.score),
    seoScore: toScore(categories.seo?.score),
    firstContentfulPaint: toRoundedNumber(audits['first-contentful-paint']?.numericValue),
    largestContentfulPaint: toRoundedNumber(audits['largest-contentful-paint']?.numericValue),
    totalBlockingTime: toRoundedNumber(audits['total-blocking-time']?.numericValue),
    cumulativeLayoutShift: toRoundedNumber(audits['cumulative-layout-shift']?.numericValue, 2),
    speedIndex: toRoundedNumber(audits['speed-index']?.numericValue),
    interactionToNextPaint: toRoundedNumber(audits['interaction-to-next-paint']?.numericValue),
    screenshot: audits['final-screenshot']?.details?.data ?? null,
    capturedAt: lighthouse.fetchTime ?? null
  }
}

async function runPageSpeedAudit(url: string, strategy: 'mobile' | 'desktop') {
  const endpoint = new URL('https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed')
  endpoint.searchParams.set('url', url)
  endpoint.searchParams.set('strategy', strategy)
  endpoint.searchParams.append('category', 'performance')
  endpoint.searchParams.append('category', 'accessibility')
  endpoint.searchParams.append('category', 'best-practices')
  endpoint.searchParams.append('category', 'seo')

  if (process.env.PAGESPEED_API_KEY) {
    endpoint.searchParams.set('key', process.env.PAGESPEED_API_KEY)
  }

  const response = await fetch(endpoint, { cache: 'no-store' })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    const message =
      payload?.error?.message ||
      payload?.error?.details?.[0]?.message ||
      `PageSpeed ${strategy} respondió con ${response.status}.`

    throw new Error(`PageSpeed ${strategy}: ${message}`)
  }

  const payload = await response.json()

  if (!payload?.lighthouseResult) {
    throw new Error(`PageSpeed ${strategy}: la API no devolvió resultados Lighthouse.`)
  }

  return normalizePageSpeed(strategy, payload)
}

function getGtmetrixHeaders() {
  const apiKey = process.env.GTMETRIX_API_KEY?.trim()

  if (!apiKey) {
    return null
  }

  return {
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    'Content-Type': 'application/vnd.api+json'
  }
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function parseGtmetrixReportId(location: string | null) {
  if (!location) {
    return null
  }

  const match = location.match(/\/reports\/([^/?]+)/)
  return match?.[1] ?? null
}

function parseGtmetrixError(payload: any) {
  const item = payload?.errors?.[0]
  if (!item) {
    return null
  }

  return item.detail || item.title || null
}

function normalizeGtmetrixReport(payload: any): GTmetrixSummary {
  const data = payload?.data ?? {}
  const attributes = data.attributes ?? {}
  const links = data.links ?? {}

  return {
    reportId: data.id,
    performanceScore: clampScore(attributes.performance_score ?? null),
    structureScore: clampScore(attributes.structure_score ?? null),
    grade: attributes.gtmetrix_grade ?? null,
    largestContentfulPaint: toRoundedNumber(attributes.largest_contentful_paint),
    totalBlockingTime: toRoundedNumber(attributes.total_blocking_time),
    cumulativeLayoutShift: toRoundedNumber(attributes.cumulative_layout_shift, 2),
    speedIndex: toRoundedNumber(attributes.speed_index),
    fullyLoadedTime: toRoundedNumber(attributes.fully_loaded_time),
    timeToFirstByte: toRoundedNumber(attributes.time_to_first_byte),
    pageBytes: toRoundedNumber(attributes.page_bytes),
    pageRequests: toRoundedNumber(attributes.page_requests),
    reportUrl: links.report_url ?? null,
    reportPdfUrl: links.report_pdf ?? null,
    reportPdfFullUrl: links.report_pdf_full ?? null,
    testedAt: typeof attributes.created === 'number'
      ? new Date(attributes.created * 1000).toISOString()
      : null
  }
}

async function runGtmetrixAudit(url: string): Promise<GTmetrixResult> {
  const headers = getGtmetrixHeaders()

  if (!headers) {
    return {
      enabled: false,
      message: 'GTmetrix no está configurado. Define GTMETRIX_API_KEY para enriquecer el reporte.'
    }
  }

  const startResponse = await fetch('https://gtmetrix.com/api/2.0/tests', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        type: 'test',
        attributes: {
          url,
          report: 'lighthouse',
          adblock: 1
        }
      }
    }),
    cache: 'no-store',
    redirect: 'manual'
  })

  if (!startResponse.ok) {
    const errorPayload = await startResponse.json().catch(() => null)
    const reason = parseGtmetrixError(errorPayload)

    return {
      enabled: false,
      message: reason ?? `GTmetrix respondió con ${startResponse.status}.`
    }
  }

  const startPayload = await startResponse.json()
  const testId = startPayload?.data?.id as string | undefined

  if (!testId) {
    return {
      enabled: false,
      message: 'GTmetrix no devolvió un test_id válido.'
    }
  }

  let reportId: string | null = null

  for (let attempt = 0; attempt < 12; attempt += 1) {
    await sleep(attempt === 0 ? 2500 : 3000)

    const pollResponse = await fetch(`https://gtmetrix.com/api/2.0/tests/${testId}`, {
      headers: { Authorization: headers.Authorization },
      cache: 'no-store',
      redirect: 'manual'
    })

    if (pollResponse.status === 303) {
      reportId = parseGtmetrixReportId(pollResponse.headers.get('location'))
      break
    }

    const pollPayload = await pollResponse.json().catch(() => null)
    const state = pollPayload?.data?.attributes?.state

    if (state === 'completed' && pollPayload?.data?.attributes?.report) {
      reportId = pollPayload.data.attributes.report as string
      break
    }

    if (state === 'error') {
      return {
        enabled: false,
        message: 'GTmetrix no pudo completar la prueba para esta URL.'
      }
    }
  }

  if (!reportId) {
    return {
      enabled: false,
      message: 'GTmetrix tardó demasiado en completar la prueba. Puedes volver a intentarlo.'
    }
  }

  const reportResponse = await fetch(`https://gtmetrix.com/api/2.0/reports/${reportId}`, {
    headers: { Authorization: headers.Authorization },
    cache: 'no-store'
  })

  if (!reportResponse.ok) {
    const errorPayload = await reportResponse.json().catch(() => null)
    const reason = parseGtmetrixError(errorPayload)

    return {
      enabled: false,
      message: reason ?? 'GTmetrix no devolvió el reporte final.'
    }
  }

  return {
    enabled: true,
    summary: normalizeGtmetrixReport(await reportResponse.json())
  }
}

function getMetricStatus(value: number | null, thresholds: { good: number; warning: number }, inverse = false): MetricStatus {
  if (value === null) {
    return 'unknown'
  }

  if (inverse) {
    if (value >= thresholds.good) return 'good'
    if (value >= thresholds.warning) return 'warning'
    return 'critical'
  }

  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.warning) return 'warning'
  return 'critical'
}

function getStatusPresentation(status: MetricStatus) {
  switch (status) {
    case 'good':
      return { emoji: '🟢', label: 'ACTIVO' }
    case 'warning':
      return { emoji: '🟡', label: 'REGULAR' }
    case 'critical':
      return { emoji: '🔴', label: 'CRÍTICO' }
    default:
      return { emoji: '⚪', label: 'SIN DATOS' }
  }
}

function average(values: Array<number | null>, weights: number[]) {
  let totalWeight = 0
  let total = 0

  values.forEach((value, index) => {
    if (typeof value === 'number') {
      total += value * weights[index]
      totalWeight += weights[index]
    }
  })

  if (!totalWeight) {
    return 0
  }

  return Math.round(total / totalWeight)
}

function buildHookSummary(input: ProspectInput, mobile: AuditSummary | null, desktop: AuditSummary | null) {
  const company = input.companyName || 'el prospecto'
  const city = input.city || 'su mercado local'
  const score = mobile?.performanceScore ?? desktop?.performanceScore ?? null

  if (score !== null && score < 50) {
    return `${company} hoy proyecta una primera impresión lenta en ${city}. Antes de evaluar servicios o portafolio, el usuario percibe fricción y eso reduce confianza comercial.`
  }

  if (score !== null && score < 90) {
    return `${company} comunica, pero todavía opera en una zona de atención en ${city}. La experiencia necesita más velocidad y claridad para que un posible cliente permanezca, entienda y contacte.`
  }

  return `${company} tiene una base digital sana, pero aún puede usar rendimiento y claridad visual como ventaja competitiva frente a competidores más lentos.`
}

function buildExecutiveSummary(
  input: ProspectInput,
  mobile: AuditSummary | null,
  desktop: AuditSummary | null,
  gtmetrix: GTmetrixSummary | null
) {
  const base = buildHookSummary(input, mobile, desktop)
  const lcp = mobile?.largestContentfulPaint ?? gtmetrix?.largestContentfulPaint ?? null
  const tbt = mobile?.totalBlockingTime ?? gtmetrix?.totalBlockingTime ?? null

  if (lcp !== null && tbt !== null) {
    return `${base} Hoy la referencia técnica principal cae en un LCP de ${Math.round(lcp / 100) / 10}s y un bloqueo aproximado de ${Math.round(tbt)}ms, suficiente para afectar percepción, interacción y conversión.`
  }

  return `${base} Este diagnóstico combina percepción de marca y lectura técnica para priorizar mejoras con impacto comercial.`
}

function buildFindings(input: ProspectInput, mobile: AuditSummary | null, gtmetrix: GTmetrixSummary | null) {
  const company = input.companyName || 'El sitio'
  const city = input.city || 'su plaza local'
  const cta = input.primaryCta || 'contacto principal'
  const lcp = mobile?.largestContentfulPaint ?? gtmetrix?.largestContentfulPaint ?? null
  const tbt = mobile?.totalBlockingTime ?? gtmetrix?.totalBlockingTime ?? null
  const cls = mobile?.cumulativeLayoutShift ?? gtmetrix?.cumulativeLayoutShift ?? null

  const findings: string[] = []

  if (lcp !== null && lcp > 4000) {
    findings.push(`La página tarda en mostrar lo importante en móvil. Si el contenido principal aparece hasta después de ${Math.round(lcp / 1000)} segundos, una parte del tráfico abandona antes de entender qué ofrece ${company} en ${city}.`)
  }

  if (tbt !== null && tbt > 300) {
    findings.push(`Aunque ${cta} existe, el sitio pasa demasiado tiempo ocupado mientras carga. Eso retrasa la interacción y hace que el usuario sienta el sitio pesado o poco confiable.`)
  }

  if (cls !== null && cls > 0.25) {
    findings.push('Mientras la página termina de cargar, algunos elementos se mueven más de lo esperado. Esa inestabilidad visual da una sensación de descuido y reduce confianza.')
  }

  if (!findings.length) {
    findings.push(`${company} no está en crisis técnica, pero todavía puede convertir mejor con una experiencia más rápida, más clara y más estable desde el primer vistazo.`)
  }

  return findings.slice(0, 3)
}

function buildCostOfInaction(input: ProspectInput, mobile: AuditSummary | null) {
  const industry = input.industry || 'su sector'
  const city = input.city || 'su región'
  const score = mobile?.performanceScore ?? null

  if (score !== null && score < 50) {
    return `En ${industry}, velocidad también es confianza. Cada mes con este rendimiento, ${input.companyName || 'la marca'} pierde visibilidad y credibilidad frente a competidores mejor optimizados en ${city}.`
  }

  return `Aunque el sitio ya comunica, todavía compite con desventaja. En ${industry}, una experiencia más rápida y más clara ayuda a ganar atención, confianza y consultas calificadas en ${city}.`
}

function buildProposals(input: ProspectInput, mobile: AuditSummary | null, gtmetrix: GTmetrixSummary | null) {
  const proposals = [
    'Un rediseño más ligero con una construcción eficiente para que el sitio se sienta rápido desde el primer segundo.',
    'Priorizar los mensajes clave, servicios y llamados a la acción para que la propuesta de valor aparezca antes y con más claridad.',
    `Reducir la fricción alrededor de ${input.primaryCta || 'los puntos de contacto'} para que la decisión de escribir o llamar ocurra más rápido.`
  ]

  const pageBytes = gtmetrix?.pageBytes ?? null
  if (pageBytes !== null && pageBytes > 4_000_000) {
    proposals[0] = 'Aligerar imágenes, videos y recursos pesados para que la experiencia sea mucho más ágil sin sacrificar percepción de marca.'
  }

  if ((mobile?.seoScore ?? null) !== null && (mobile?.seoScore ?? 0) < 75) {
    proposals.push(`Reforzar el SEO local para capturar búsquedas relevantes de ${input.industry || 'la categoría'} en ${input.city || 'su mercado'} con una base técnica más sólida.`)
  }

  return proposals.slice(0, 4)
}

function buildHealthRows(input: ProspectInput, mobile: AuditSummary | null, desktop: AuditSummary | null) {
  const performanceStatus = getMetricStatus(mobile?.performanceScore ?? null, { good: 90, warning: 50 }, true)
  const uxReference = average(
    [mobile?.accessibilityScore ?? null, desktop?.accessibilityScore ?? null],
    [0.7, 0.3]
  )
  const uxStatus = getMetricStatus(uxReference, { good: 85, warning: 70 }, true)
  const ctaStatus = getMetricStatus(mobile?.totalBlockingTime ?? null, { good: 200, warning: 600 })

  const perf = getStatusPresentation(performanceStatus)
  const ux = getStatusPresentation(uxStatus)
  const cta = getStatusPresentation(ctaStatus)

  return [
    {
      metric: 'Velocidad de carga (móvil)',
      state: perf.label,
      emoji: perf.emoji,
      impact:
        performanceStatus === 'critical'
          ? 'El sitio tarda demasiado en mostrar información clave y una parte relevante del tráfico abandona antes de entender la oferta.'
          : performanceStatus === 'warning'
            ? 'La experiencia comunica, pero todavía hay suficiente fricción como para frenar atención, confianza y clics al contacto.'
            : 'La carga inicial acompaña bien la percepción de marca y no castiga tanto la intención del usuario.'
    },
    {
      metric: 'Experiencia de usuario',
      state: ux.label,
      emoji: ux.emoji,
      impact:
        uxStatus === 'critical'
          ? 'La lectura y la interacción pierden claridad en pantallas pequeñas, lo que afecta confianza y comprensión comercial.'
          : uxStatus === 'warning'
            ? 'La base visual funciona, pero aún hay detalles que reducen claridad y consistencia entre dispositivos.'
            : 'La experiencia se percibe estable y facilita entender servicios, portafolio o propuesta comercial.'
    },
    {
      metric: `Canal de ventas (${input.primaryCta || 'CTA principal'})`,
      state: cta.label,
      emoji: cta.emoji,
      impact:
        ctaStatus === 'critical'
          ? `El usuario tarda en poder interactuar con ${input.primaryCta || 'el CTA principal'}, así que la intención de contacto llega tarde.`
          : ctaStatus === 'warning'
            ? `El CTA principal existe y funciona, pero la carga todavía retrasa el momento ideal para hacer clic.`
            : `El flujo hacia ${input.primaryCta || 'el contacto'} está activo y responde sin demasiada fricción.`
    }
  ]
}

function buildTechnicalSummary(mobile: AuditSummary | null, gtmetrix: GTmetrixSummary | null) {
  const lcp = mobile?.largestContentfulPaint ?? gtmetrix?.largestContentfulPaint ?? null
  const tbt = mobile?.totalBlockingTime ?? gtmetrix?.totalBlockingTime ?? null
  const cls = mobile?.cumulativeLayoutShift ?? gtmetrix?.cumulativeLayoutShift ?? null

  const parts = [
    lcp !== null ? `LCP ${Math.round(lcp / 100) / 10}s` : null,
    tbt !== null ? `TBT ${Math.round(tbt)}ms` : null,
    cls !== null ? `CLS ${cls.toFixed(2)}` : null
  ].filter(Boolean)

  return parts.length
    ? `Referencia técnica principal: ${parts.join(' · ')}.`
    : 'No hubo suficientes métricas técnicas para construir una lectura comparativa completa.'
}

function buildHealthStatus(score: number) {
  if (score < 50) return 'Crítico'
  if (score < 90) return 'Atención'
  return 'Sano'
}

export async function createProspectReport(input: ProspectInput) {
  const normalizedInput: ProspectInput = {
    companyName: input.companyName.trim(),
    websiteUrl: input.websiteUrl.trim(),
    industry: input.industry.trim(),
    city: input.city.trim(),
    contactName: input.contactName.trim(),
    contactPhone: input.contactPhone.trim(),
    contactEmail: input.contactEmail.trim(),
    primaryCta: input.primaryCta.trim() || 'WhatsApp',
    notes: input.notes.trim()
  }

  const [mobileResult, desktopResult] = await Promise.allSettled([
    runPageSpeedAudit(normalizedInput.websiteUrl, 'mobile'),
    runPageSpeedAudit(normalizedInput.websiteUrl, 'desktop')
  ])

  const mobile = mobileResult.status === 'fulfilled' ? mobileResult.value : null
  const desktop = desktopResult.status === 'fulfilled' ? desktopResult.value : null
  const pageSpeedErrors = [
    mobileResult.status === 'rejected' ? mobileResult.reason : null,
    desktopResult.status === 'rejected' ? desktopResult.reason : null
  ]
    .filter(Boolean)
    .map((reason) => (reason instanceof Error ? reason.message : String(reason)))

  if (!mobile && !desktop) {
    throw new Error(
      pageSpeedErrors[0] ??
        'No fue posible obtener métricas desde PageSpeed Insights para esta URL.'
    )
  }

  const gtmetrixResult = await runGtmetrixAudit(normalizedInput.websiteUrl)
  const gtmetrix = gtmetrixResult.enabled ? gtmetrixResult.summary : null

  const overallScore = average(
    [
      mobile?.performanceScore ?? desktop?.performanceScore ?? null,
      desktop?.performanceScore ?? null,
      mobile?.accessibilityScore ?? desktop?.accessibilityScore ?? null,
      mobile?.seoScore ?? desktop?.seoScore ?? null
    ],
    [0.5, 0.2, 0.15, 0.15]
  )

  const report: ProspectReport = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    input: normalizedInput,
    overallScore,
    healthStatus: buildHealthStatus(overallScore),
    hookSummary: buildHookSummary(normalizedInput, mobile, desktop),
    executiveSummary: buildExecutiveSummary(normalizedInput, mobile, desktop, gtmetrix),
    technicalSummary: buildTechnicalSummary(mobile, gtmetrix),
    pagespeed: { mobile, desktop },
    gtmetrix,
    healthRows: buildHealthRows(normalizedInput, mobile, desktop),
    findings: buildFindings(normalizedInput, mobile, gtmetrix),
    costOfInaction: buildCostOfInaction(normalizedInput, mobile),
    proposals: buildProposals(normalizedInput, mobile, gtmetrix),
    sourceStatus: {
      pagespeed: Boolean(mobile || desktop),
      pagespeedMessage: pageSpeedErrors[0] ?? null,
      gtmetrix: gtmetrixResult.enabled,
      gtmetrixMessage: gtmetrixResult.enabled ? null : gtmetrixResult.message
    }
  }

  return report
}

export function formatScore(value: number | null) {
  return value === null ? 'N/D' : `${Math.round(value)}/100`
}

export function formatMilliseconds(value: number | null) {
  if (value === null) return 'N/D'
  if (value >= 1000) return `${(value / 1000).toFixed(1)} s`
  return `${Math.round(value)} ms`
}

export function formatCLS(value: number | null) {
  return value === null ? 'N/D' : value.toFixed(2)
}

export function formatBytes(value: number | null) {
  if (value === null) return 'N/D'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} MB`
  if (value >= 1000) return `${(value / 1000).toFixed(0)} KB`
  return `${Math.round(value)} B`
}

export function getScoreTone(score: number | null): ScoreTone {
  if (score === null) return 'neutral'
  if (score >= 90) return 'green'
  if (score >= 50) return 'amber'
  return 'red'
}

export function getScoreStateLabel(score: number | null) {
  const tone = getScoreTone(score)

  if (tone === 'green') return 'Sano'
  if (tone === 'amber') return 'Atención'
  if (tone === 'red') return 'Crítico'
  return 'Sin datos'
}

export function getWebVitalStatus(metric: 'FCP' | 'LCP' | 'TBT' | 'CLS' | 'SI', value: number | null): MetricStatus {
  switch (metric) {
    case 'FCP':
      return getMetricStatus(value, { good: 1800, warning: 3000 })
    case 'LCP':
      return getMetricStatus(value, { good: 2500, warning: 4000 })
    case 'TBT':
      return getMetricStatus(value, { good: 200, warning: 600 })
    case 'CLS':
      return getMetricStatus(value, { good: 0.1, warning: 0.25 })
    case 'SI':
      return getMetricStatus(value, { good: 3400, warning: 5800 })
    default:
      return 'unknown'
  }
}
