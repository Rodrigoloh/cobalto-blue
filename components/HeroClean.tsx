'use client'
import Link from 'next/link'
import { useCallback } from 'react'

// Hero con media de fondo configurable.
// Coloca tus assets en:
// - Imagen: public/hero/hero.jpg (o .png)
// - Video:  public/hero/hero.mp4 (opcional)
// Este componente muestra imagen de fondo y, si existe el video, lo superpone.

export default function HeroClean() {
  const goNext = useCallback(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="hero" className="section relative h-screen">
      {/* Fondo imagen */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: 'url(/hero/hero.jpg)' }}
      />
      {/* Video opcional */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/hero/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero/hero.jpg"
      />

      {/* Overlay para legibilidad si el fondo es claro */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="relative mx-auto max-w-6xl w-full px-6 h-full flex items-center text-white">
        <div>
          <p className="text-sm tracking-wider text-white/80 uppercase">Estudio</p>
          <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Branding y Producto Digital con enfoque limpio y atemporal
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            Estrategia, diseño y tecnología para marcas que buscan claridad. Menos ruido, más intención.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/nosotros"
              className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-5 py-2.5 text-white hover:bg-white/20 transition"
            >
              Nosotros
            </Link>
          </div>
        </div>

        {/* Flecha flotante hacia siguiente sección */}
        <button
          onClick={goNext}
          aria-label="Siguiente sección"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 hover:text-white"
        >
          <div className="rounded-full bg-black/60 px-4 py-2 text-sm">Siguiente</div>
          <svg className="mx-auto mt-2 animate-float-y" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
