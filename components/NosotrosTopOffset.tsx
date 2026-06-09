'use client'

import { useEffect } from 'react'

export default function NosotrosTopOffset() {
  useEffect(() => {
    const setOffset = () => {
      document.body.style.setProperty('--nosotros-top-offset', window.scrollY > 4 ? '0px' : '56px')
    }

    setOffset()
    window.addEventListener('scroll', setOffset, { passive: true })
    window.addEventListener('resize', setOffset)
    return () => {
      window.removeEventListener('scroll', setOffset)
      window.removeEventListener('resize', setOffset)
      document.body.style.removeProperty('--nosotros-top-offset')
    }
  }, [])

  return null
}
