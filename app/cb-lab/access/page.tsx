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
    <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center justify-center">
        <section className="report-card w-full rounded-[2rem] p-8 shadow-2xl lg:p-10">
          <div className="space-y-8">
            <div className="space-y-5 text-center">
              <img
                src="/brand/logo-main-blue.png"
                alt="cobalto.blue"
                className="mx-auto h-8 w-auto"
              />
              <div className="space-y-3">
                <p className="font-['PPRightGroteskMono'] text-[11px] uppercase tracking-[0.38em] text-[#1F00FF]">
                  WEB TRACKING REPORTING
                </p>
                <p className="text-sm text-black/58">
                  Acceso privado al dashboard de reportes.
                </p>
              </div>
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
                Iniciar sesión
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
