'use client'

type ReportPrintActionsProps = {
  dashboardHref?: string
}

export function ReportPrintActions({ dashboardHref = '/cb-lab/reporting' }: ReportPrintActionsProps) {
  return (
    <div className="print-hidden sticky top-4 z-30 mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
      <a href={dashboardHref} className="rounded-full border border-black px-4 py-2 transition hover:bg-black hover:text-white">
        Dashboard
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-[#1F00FF] px-4 py-2 text-white transition hover:bg-black"
      >
        Guardar como PDF
      </button>
    </div>
  )
}
