'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useState } from 'react'

// Hero con media de fondo configurable.
// Coloca tus assets en:
// - Imagen: public/hero/hero.jpg (o .png)
// - Video:  public/hero/hero.mp4 (opcional)
// Este componente muestra imagen de fondo y, si existe el video, lo superpone.

export default function HeroClean() {
  const [showVideo, setShowVideo] = useState(true)
  const goNext = useCallback(() => {
    document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="hero" className="section relative h-screen">
      {/* Fondo imagen */}
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: 'url(/hero/hero.jpg)' }}
      />
      {/* Video opcional */}
      {showVideo && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src="/hero/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero/hero.jpg"
          onError={() => setShowVideo(false)}
        />
      )}

      {/* Overlay para legibilidad si el fondo es claro */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="relative mx-auto max-w-6xl w-full px-6 h-full flex items-center text-white">
        <div className="w-full text-center">
          <Image
            src="/brand/cb_logo-main-fullwhite.png"
            alt="cobalto.blue"
            width={800}
            height={240}
            priority
            className="mx-auto w-[min(80vw,720px)] h-auto"
          />
        </div>

        {/* Flecha flotante hacia siguiente sección (sin texto) */}
        <button
          onClick={goNext}
          aria-label="Siguiente sección"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 hover:text-white"
        >
          <svg className="mx-auto animate-float-y" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
