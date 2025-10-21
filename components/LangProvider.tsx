'use client'
import { useEffect } from 'react'

export default function LangProvider() {
  useEffect(() => {
    try {
      const lang = localStorage.getItem('lang') || 'es'
      document.documentElement.lang = lang
    } catch {
      document.documentElement.lang = 'es'
    }
  }, [])
  return null
}

