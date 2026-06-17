'use client'

import { useEffect } from 'react'

export default function NosotrosTopOffset() {
  useEffect(() => {
    const setOffset = () => {
      const offset = Math.max(0, 56 - window.scrollY)
      document.documentElement.style.setProperty('--nosotros-top-offset', `${offset}px`)
    }

    setOffset()
    window.addEventListener('scroll', setOffset, { passive: true })
    window.addEventListener('resize', setOffset)
    return () => {
      window.removeEventListener('scroll', setOffset)
      window.removeEventListener('resize', setOffset)
      document.documentElement.style.removeProperty('--nosotros-top-offset')
    }
  }, [])

  return null
}
