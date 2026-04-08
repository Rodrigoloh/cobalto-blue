import { isPrivateAuthConfigured } from '@/lib/private-auth'

type AccessPageProps = {
  searchParams?: {
    error?: string
    setup?: string
    next?: string
    loggedOut?: string
  }
}

export default function PrivateAccessPage({ searchParams }: AccessPageProps) {
  const isConfigured = isPrivateAuthConfigured()
  const nextPath =
    searchParams?.next && searchParams.next.startsWith('/cb-lab')
      ? searchParams.next
      : '/cb-lab/reporting'

  return (
    <main className="report-shell min-h-screen px-6 py-10 text-[#111111]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between rounded-[2rem] bg-[#111111] p-8 text-white shadow-2xl lg:p-12">
          <div className="space-y-6">
            <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-white/60">
              cobalto.blue private lab
            </p>
            <div className="space-y-4">
              <h1 className="max-w-xl font-['NeueMachina'] text-4xl leading-none md:text-6xl">
                Reportes privados para diagnóstico y cierre comercial.
              </h1>
              <p className="max-w-xl text-base text-white/74 md:text-lg">
                Genera un hook report de una página o un reporte ejecutivo completo con datos de
                PageSpeed Insights y GTmetrix, listo para guardar como PDF.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Modo 01</p>
              <p className="mt-2 text-xl">Hook report</p>
              <p className="mt-2 text-sm text-white/65">
                Una lectura breve para abrir conversación sin revelar toda la cocina.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Modo 02</p>
              <p className="mt-2 text-xl">Reporte ejecutivo</p>
              <p className="mt-2 text-sm text-white/65">
                Cuatro páginas con métricas, hallazgos, costo de no actuar y propuesta rápida.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Modo 03</p>
              <p className="mt-2 text-xl">Privado</p>
              <p className="mt-2 text-sm text-white/65">
                Ruta oculta, acceso con contraseña y sin navegación pública.
              </p>
            </div>
          </div>
        </section>

        <section className="report-card flex items-center rounded-[2rem] p-8 lg:p-12">
          <div className="w-full space-y-5">
            <div>
              <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
                acceso
              </p>
              <h2 className="mt-3 font-['NeueMachina'] text-3xl leading-none">
                Entrar al dashboard oculto
              </h2>
              <p className="mt-3 text-sm text-black/65">
                Usa la contraseña definida en `REPORT_ACCESS_PASSWORD`.
              </p>
            </div>

            {searchParams?.error === '1' ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                La contraseña no coincide.
              </p>
            ) : null}

            {searchParams?.loggedOut === '1' ? (
              <p className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm text-black/70">
                La sesión privada se cerró.
              </p>
            ) : null}

            {!isConfigured || searchParams?.setup === '1' ? (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Falta definir `REPORT_ACCESS_PASSWORD` en variables de entorno antes de usar esta
                sección.
              </p>
            ) : null}

            <form action="/api/auth/private" method="post" className="space-y-4">
              <input type="hidden" name="next" value={nextPath} />
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-black/70">Contraseña</span>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 outline-none transition focus:border-[#1F00FF]"
                  placeholder="••••••••••"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1F00FF] px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              >
                Entrar
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
