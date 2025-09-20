'use client'

import { useEffect, useState } from 'react'

export type StageMetrics = {
  ready: boolean
  windowHeight: number
  heroTop: number
  heroBottom: number
  nosotrosTop: number
  nosotrosBottom: number
  nosotrosLock: number
  nosotrosHold: number
  stage3Start: number
  serviciosTop: number
  serviciosRelease: number
  contactoTop: number
  contactoRelease: number
}

const initialMetrics: StageMetrics = {
  ready: false,
  windowHeight: 0,
  heroTop: 0,
  heroBottom: 0,
  nosotrosTop: 0,
  nosotrosBottom: 0,
  nosotrosLock: 0,
  nosotrosHold: 0,
  stage3Start: 0,
  serviciosTop: 0,
  serviciosRelease: 0,
  contactoTop: 0,
  contactoRelease: 0
}

export function useStageMetrics(): StageMetrics {
  const [metrics, setMetrics] = useState<StageMetrics>(initialMetrics)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let resizeFrame = 0

    const compute = () => {
      const hero = document.getElementById('inicio')
      const nosotros = document.getElementById('nosotros')
      const servicios = document.getElementById('servicios')
      const contacto = document.getElementById('contacto')

      if (!hero || !nosotros || !servicios) return

      const windowHeight = window.innerHeight

      const heroRect = hero.getBoundingClientRect()
      const nosotrosRect = nosotros.getBoundingClientRect()
      const serviciosRect = servicios.getBoundingClientRect()
      const contactoRect = contacto?.getBoundingClientRect()
      const scrollY = window.scrollY

      const heroTop = heroRect.top + scrollY
      const heroBottom = heroRect.bottom + scrollY

      const nosotrosTop = nosotrosRect.top + scrollY
      const nosotrosBottom = nosotrosRect.bottom + scrollY

      const serviciosTop = serviciosRect.top + scrollY
      const serviciosRelease = serviciosTop + windowHeight
      const contactoTop = (contactoRect?.top ?? serviciosRect.bottom) + scrollY
      const contactoRelease = contactoTop + windowHeight

      const lockTarget = nosotrosBottom - windowHeight * 0.12
      const minLock = heroBottom + windowHeight * 0.12
      const lockEntry = nosotrosTop + windowHeight * 0.6
      const nosotrosLock = Math.max(minLock, Math.min(lockTarget, lockEntry))

      const holdUpperBound = serviciosTop - windowHeight * 0.65
      const fallbackHold = Math.max(nosotrosLock + windowHeight * 0.15, nosotrosTop + windowHeight * 0.9)
      const holdCandidate = Math.min(lockTarget, fallbackHold, holdUpperBound)
      const nosotrosHold = Math.max(nosotrosLock, holdCandidate)

      const stage3Floor = nosotrosHold + windowHeight * 0.22
      const serviciosEntry = serviciosTop - windowHeight * 0.95
      let stage3Start = Math.max(stage3Floor, serviciosEntry)
      if (stage3Start >= serviciosRelease) {
        stage3Start = serviciosRelease - windowHeight * 0.1
      }

      setMetrics({
        ready: true,
        windowHeight,
        heroTop,
        heroBottom,
        nosotrosTop,
        nosotrosBottom,
        nosotrosLock,
        nosotrosHold,
        stage3Start,
        serviciosTop,
        serviciosRelease,
        contactoTop,
        contactoRelease
      })
    }

    const scheduleCompute = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(compute)
    }

    compute()
    const timeout = window.setTimeout(compute, 250)

    window.addEventListener('resize', scheduleCompute)
    window.addEventListener('orientationchange', scheduleCompute)

    return () => {
      window.removeEventListener('resize', scheduleCompute)
      window.removeEventListener('orientationchange', scheduleCompute)
      cancelAnimationFrame(resizeFrame)
      window.clearTimeout(timeout)
    }
  }, [])

  return metrics
}
