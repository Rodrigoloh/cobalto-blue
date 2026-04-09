'use client'

import { useState } from 'react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

type ReportPrintActionsProps = {
  dashboardHref?: string
  pdfTargetId?: string
  pdfFileName?: string
}

export function ReportPrintActions({
  dashboardHref = '/cb-lab/reporting',
  pdfTargetId,
  pdfFileName = 'reporte-hook.pdf'
}: ReportPrintActionsProps) {
  const [isExporting, setIsExporting] = useState(false)

  async function handleSavePdf() {
    if (!pdfTargetId) {
      window.print()
      return
    }

    const target = document.getElementById(pdfTargetId)

    if (!target) {
      window.print()
      return
    }

    try {
      setIsExporting(true)

      const dataUrl = await toPng(target, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: Math.min(window.devicePixelRatio || 2, 2.5)
      })

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 18

      const canvasWidth = target.offsetWidth
      const canvasHeight = target.offsetHeight
      const widthRatio = (pageWidth - margin * 2) / canvasWidth
      const heightRatio = (pageHeight - margin * 2) / canvasHeight
      const scale = Math.min(widthRatio, heightRatio)
      const renderWidth = canvasWidth * scale
      const renderHeight = canvasHeight * scale
      const x = (pageWidth - renderWidth) / 2
      const y = (pageHeight - renderHeight) / 2

      pdf.addImage(dataUrl, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST')
      pdf.save(pdfFileName)
    } catch (error) {
      console.error('No fue posible exportar el PDF del Hook.', error)
      window.print()
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="print-hidden sticky top-4 z-30 mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
      <a href={dashboardHref} className="rounded-full border border-black px-4 py-2 transition hover:bg-black hover:text-white">
        Dashboard
      </a>
      <button
        type="button"
        onClick={handleSavePdf}
        disabled={isExporting}
        className="rounded-full bg-[#1F00FF] px-4 py-2 text-white transition hover:bg-black"
      >
        {isExporting ? 'Generando PDF...' : 'Guardar como PDF'}
      </button>
    </div>
  )
}
