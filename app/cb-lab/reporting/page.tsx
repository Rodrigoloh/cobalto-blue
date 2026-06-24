import { ReportingDashboardClient } from '@/components/private/ReportingDashboardClient'

export default function ReportingDashboardPage() {
  const geminiConfigured = Boolean(process.env.GEMINI_API_KEY)

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
                Generador de PDF full por JSON.
              </h1>
              <p className="max-w-2xl text-white/70">
                Pega el JSON final generado por la Gem. El reporte combina esa narrativa con
                métricas reales de Google PageSpeed para exportar el PDF completo.
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

        <ReportingDashboardClient geminiConfigured={geminiConfigured} />
      </div>
    </main>
  )
}
