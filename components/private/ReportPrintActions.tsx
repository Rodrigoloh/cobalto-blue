'use client'

import { useState } from 'react'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

type ReportPrintActionsProps = {
  dashboardHref?: string
  pdfTargetId?: string
  pdfFileName?: string
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'))

  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve) => {
        const done = () => resolve()
        image.addEventListener('load', done, { once: true })
        image.addEventListener('error', done, { once: true })
      })
    })
  )
}

function getElementBackground(element: HTMLElement) {
  const background = window.getComputedStyle(element).backgroundColor

  return background && background !== 'rgba(0, 0, 0, 0)' ? background : '#ffffff'
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

    let exportWrapper: HTMLDivElement | null = null

    try {
      setIsExporting(true)

      const wrapper = document.createElement('div')
      exportWrapper = wrapper

      wrapper.setAttribute('aria-hidden', 'true')
      wrapper.dataset.hookPdfExport = 'true'
      wrapper.style.position = 'fixed'
      wrapper.style.left = '-20000px'
      wrapper.style.top = '0'
      wrapper.style.margin = '0'
      wrapper.style.padding = '0'
      wrapper.style.background = '#ffffff'
      wrapper.style.zIndex = '-1'
      wrapper.style.overflow = 'hidden'
      document.body.appendChild(wrapper)

      const sourcePages = Array.from(target.querySelectorAll<HTMLElement>('.report-export-page'))
      const pages = sourcePages.length ? sourcePages : [target]
      const firstRect = pages[0].getBoundingClientRect()
      const isDeckFormat = target.dataset.pdfFormat === 'deck' || firstRect.width > firstRect.height
      const pdf = new jsPDF({
        orientation: isDeckFormat ? 'landscape' : 'portrait',
        unit: 'pt',
        format: isDeckFormat ? [720, 405] : 'letter'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = isDeckFormat ? 0 : 18

      for (let index = 0; index < pages.length; index += 1) {
        const sourcePage = pages[index]
        const rect = sourcePage.getBoundingClientRect()
        const exportWidth = Math.ceil(rect.width)
        const exportHeight = Math.ceil(rect.height)
        const clone = sourcePage.cloneNode(true) as HTMLElement

        wrapper.replaceChildren(clone)
        wrapper.style.width = `${exportWidth}px`
        wrapper.style.height = `${exportHeight}px`

        clone.removeAttribute('id')
        clone.style.margin = '0'
        clone.style.width = `${exportWidth}px`
        clone.style.maxWidth = `${exportWidth}px`
        clone.style.minHeight = `${exportHeight}px`
        clone.style.height = `${exportHeight}px`
        clone.style.maxHeight = `${exportHeight}px`
        clone.style.transform = 'none'
        clone.style.boxSizing = 'border-box'
        clone.style.backgroundColor = getElementBackground(sourcePage)

        await document.fonts?.ready
        await waitForImages(clone)

        const dataUrl = await toPng(clone, {
          cacheBust: true,
          backgroundColor: getElementBackground(sourcePage),
          width: exportWidth,
          height: exportHeight,
          canvasWidth: exportWidth,
          canvasHeight: exportHeight,
          pixelRatio: Math.min(window.devicePixelRatio || 2, 2)
        })

        if (index > 0) {
          pdf.addPage(isDeckFormat ? [720, 405] : 'letter', isDeckFormat ? 'landscape' : 'portrait')
        }

        const imageProps = pdf.getImageProperties(dataUrl)
        const widthRatio = (pageWidth - margin * 2) / imageProps.width
        const heightRatio = (pageHeight - margin * 2) / imageProps.height
        const scale = Math.min(widthRatio, heightRatio)
        const renderWidth = imageProps.width * scale
        const renderHeight = imageProps.height * scale
        const x = (pageWidth - renderWidth) / 2
        const y = (pageHeight - renderHeight) / 2

        pdf.addImage(dataUrl, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST')
      }

      pdf.save(pdfFileName)
    } catch (error) {
      console.error('No fue posible exportar el PDF del Hook.', error)
      window.print()
    } finally {
      exportWrapper?.parentElement?.removeChild(exportWrapper)
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
