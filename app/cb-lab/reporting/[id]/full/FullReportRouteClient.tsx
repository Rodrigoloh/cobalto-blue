'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getStoredFullReport } from '@/lib/full-report-browser-storage'
import { FullReportPage } from './FullReportPage'
import fullReportMockData from './mock-data.json'

type FullReportRouteClientProps = {
  id: string
}

export function FullReportRouteClient({ id }: FullReportRouteClientProps) {
  const [mockData, setMockData] = useState<any | null | undefined>(undefined)

  useEffect(() => {
    const stored = getStoredFullReport(id)
    setMockData(stored?.mockData ?? (id === 'mock-report' ? fullReportMockData : null))
  }, [id])

  if (mockData === undefined) {
    return (
      <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white/80 p-8 text-center shadow-xl">
          <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
            cargando reporte
          </p>
          <p className="mt-4 text-sm text-black/60">
            Recuperando el JSON guardado en este navegador.
          </p>
        </div>
      </main>
    )
  }

  if (!mockData) {
    return (
      <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-xl">
          <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
            reporte no disponible
          </p>
          <h1 className="mt-4 font-['NeueMachina'] text-4xl leading-none">No encontramos este JSON.</h1>
          <p className="mt-4 text-sm text-black/65">
            Los reportes full por JSON se guardan en el navegador donde los generaste. Vuelve a
            pegar el JSON desde el generador para reconstruirlo.
          </p>
          <Link
            href="/cb-lab/reporting"
            className="mt-6 inline-flex rounded-full bg-[#1F00FF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
          >
            Volver al generador
          </Link>
        </div>
      </main>
    )
  }

  return <FullReportPage mockData={mockData} />
}
