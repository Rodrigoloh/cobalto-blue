import Link from 'next/link'

import { listReports } from '@/lib/report-storage'

type ReportingPageProps = {
  searchParams?: {
    error?: string
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value))
}

export default async function ReportingDashboardPage({ searchParams }: ReportingPageProps) {
  const reports = await listReports()
  const gtmetrixConfigured = Boolean(process.env.GTMETRIX_API_KEY)

  return (
    <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-[#111111] p-8 text-white shadow-2xl lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-white/55">
              laboratorio privado
            </p>
            <div className="space-y-3">
              <h1 className="font-['NeueMachina'] text-4xl leading-none md:text-5xl">
                Generador de reportes comerciales.
              </h1>
              <p className="max-w-2xl text-white/70">
                Esta sección no tiene links públicos. Genera un dashboard privado y luego exporta
                dos versiones de PDF: un onepager de hook y un reporte ejecutivo completo.
              </p>
            </div>
          </div>

          <form action="/api/auth/private/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-white/20 px-5 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        {searchParams?.error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {searchParams.error}
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

            <form action="/api/reports/run" method="post" className="grid gap-4">
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
                className="mt-2 rounded-full bg-[#1F00FF] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              >
                Generar dashboard y reportes
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
                    Base del reporte. Se consulta en móvil y desktop.
                  </p>
                </div>
                <div className="rounded-3xl border border-black/10 bg-white/60 p-4">
                  <p className="text-sm font-semibold text-black/60">GTmetrix</p>
                  <p className="mt-2 text-lg text-black">{gtmetrixConfigured ? 'Configurado' : 'Opcional'}</p>
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
                    historial
                  </p>
                  <h2 className="mt-3 font-['NeueMachina'] text-2xl leading-none">
                    Reportes recientes
                  </h2>
                </div>
                <span className="rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black/55">
                  {reports.length} items
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
                    Aún no hay reportes guardados.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
