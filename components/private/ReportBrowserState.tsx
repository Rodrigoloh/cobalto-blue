'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

import type { ProspectReport } from '@/lib/performance-report'
import { getStoredReport } from '@/lib/report-browser-storage'

type ReportBrowserStateProps = {
  id: string
  children: (report: ProspectReport) => ReactNode
}

export function ReportBrowserState({ id, children }: ReportBrowserStateProps) {
  const [report, setReport] = useState<ProspectReport | null | undefined>(undefined)

  useEffect(() => {
    setReport(getStoredReport(id))
  }, [id])

  if (report === undefined) {
    return (
      <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white/80 p-8 text-center shadow-xl">
          <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
            cargando reporte
          </p>
          <p className="mt-4 text-sm text-black/60">
            Recuperando el snapshot guardado en este navegador.
          </p>
        </div>
      </main>
    )
  }

  if (!report) {
    return (
      <main className="report-shell min-h-screen px-6 py-8 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white/85 p-8 shadow-xl">
          <p className="font-['PPRightGroteskMono'] text-xs uppercase tracking-[0.35em] text-[#1F00FF]">
            reporte no disponible
          </p>
          <h1 className="mt-4 font-['NeueMachina'] text-4xl leading-none">No encontramos este snapshot.</h1>
          <p className="mt-4 text-sm text-black/65">
            En producción los reportes se guardan en el navegador donde los generaste. Si abriste
            este link desde otro dispositivo, otra pestaña privada o después de limpiar storage,
            tendrás que regenerarlo desde el dashboard.
          </p>
          <Link
            href="/cb-lab/reporting"
            className="mt-6 inline-flex rounded-full bg-[#1F00FF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
          >
            Volver al dashboard
          </Link>
        </div>
      </main>
    )
  }

  return <>{children(report)}</>
}
