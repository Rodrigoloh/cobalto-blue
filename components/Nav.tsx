'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Nav() {
  const [onHero, setOnHero] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hero = document.getElementById('hero')
    if (!hero) { setOnHero(false); return }

    const obs = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5, 1] }
    )
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  const headerCls = onHero
    ? 'bg-transparent border-transparent text-white'
    : 'bg-white/85 backdrop-blur border-b border-neutral-200 text-neutral-900'

  const linkBase = 'transition'
  const linkCls = onHero
    ? 'text-white hover:text-[#1F00FF]'
    : 'text-neutral-800 hover:text-black'

  const ctaCls = `${onHero ? 'bg-[#1F00FF] text-white hover:bg-black' : 'bg-[#1F00FF] text-white hover:bg-black'} rounded-full px-4 py-2 transition`

  return (
    <header className={`fixed top-0 inset-x-0 z-40 ${headerCls}`}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="cobalto.blue" className="block">
          {/* Imagotipo: blanco sobre hero, negro sobre fondo blanco */}
          <img
            src={onHero ? '/brand/cb_logo-main-white.png' : '/brand/cb_logo-main-black.png'}
            alt="cobalto.blue"
            className="h-6 md:h-7 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/nosotros" className={`${linkBase} ${linkCls}`}>Nosotros</Link>
          <Link href="/work" className={`${linkBase} ${linkCls}`}>Proyectos</Link>
          <Link href="/contacto" className={`${linkBase} ${linkCls}`}>Contacto</Link>
          <button
            onClick={() => {
              try {
                localStorage.setItem('lang', 'en')
              } catch {}
              window.location.reload()
            }}
            className={`${linkBase} ${onHero ? 'text-white/90 hover:text-white' : 'text-neutral-800 hover:text-black'} uppercase tracking-wide`}
            aria-label="Cambiar idioma a inglés"
          >EN</button>
          <a href="mailto:hey@cobalto.blue" className={ctaCls}>Contáctanos</a>
        </nav>
      </div>
    </header>
  )
}
