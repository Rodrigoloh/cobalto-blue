'use client'

import { useEffect } from 'react'

export default function NosotrosBodyClass() {
  useEffect(() => {
    document.body.classList.add('nosotros-page')
    return () => document.body.classList.remove('nosotros-page')
  }, [])

  return null
}
