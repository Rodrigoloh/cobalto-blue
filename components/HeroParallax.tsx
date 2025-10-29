"use client"
import { useEffect, useRef, useState } from 'react'

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const top = rect.top
      // Cuando el hero empieza a salir por arriba (top < 0), aplicamos parallax
      const scrolled = Math.max(0, -top) // cantidad que el hero ha subido
      const factor = 0.35 // más bajo = más lento que el fondo
      setOffsetY(scrolled * factor)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="hero" ref={ref} className="section relative h-screen">
      <div className="absolute inset-0 -z-10 bg-center bg-cover" style={{ backgroundImage: 'url(/hero/hero.jpg)' }} />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="h-full w-full flex items-center justify-center will-change-transform" style={{ transform: `translateY(${offsetY}px)` }}>
        <img src="/brand/cb_logo-main-fullwhite.png" alt="cobalto.blue" className="w-[min(80vw,720px)] h-auto" />
      </div>

      {/* Botón para pasar a la siguiente sección */}
      <a href="#intro" aria-label="Siguiente sección" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white">
        <div className="rounded-full bg-black/60 px-4 py-2 text-sm">Siguiente</div>
        <svg className="mx-auto mt-2 animate-float-y" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  )
}

