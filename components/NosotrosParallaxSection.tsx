'use client'

import { useEffect, useRef } from 'react'

export default function NosotrosParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    let raf = 0
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

    const getNavHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      const parsed = Number.parseFloat(raw)
      return Number.isFinite(parsed) ? parsed : 64
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const textRect = text.getBoundingClientRect()
      const progress = clamp(-rect.top / rect.height, 0, 1)
      const y = progress * 80
      text.style.transform = `translate3d(0, ${y}px, 0)`

      const navH = getNavHeight()
      const fadeRange = 140
      const distance = textRect.top - navH
      const opacity = clamp(distance / fadeRange, 0, 1)
      text.style.opacity = String(opacity)
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }
    const onResize = () => {
      update()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-fixed bg-cover bg-center text-white"
      style={{ backgroundImage: 'url(/nosotros/parallax.jpg)' }}
      aria-label="Parallax"
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <div className="relative z-10 h-full flex items-center">
        <div ref={textRef} className="w-full md:w-1/2 max-w-xl px-6 md:px-12 text-left will-change-transform">
          <p className="text-2xl md:text-4xl font-bold leading-tight">
            Cobalto Blue existe para dar forma a las ideas que merecen ser vistas.
          </p>
          <p className="mt-5 text-lg md:text-xl font-bold leading-snug">
            Construimos marcas que comunican con claridad y se sienten vivas. En cada proyecto buscamos equilibrio
            entre lo racional y lo sensorial: estrategia, estética y una narrativa que permanezca.
          </p>
        </div>
      </div>
    </section>
  )
}
