"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function Nav() {
  // Detecta si el hero está visible para mostrar navbar transparente solo ahí
  const [onHero, setOnHero] = useState(true)
  const pathname = typeof window !== 'undefined' ? usePathname() : '/'

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hero = document.getElementById('hero')
    let obs: IntersectionObserver | null = null
    if (!hero) {
      setOnHero(false)
      return
    }
    // Estado inicial basado en posición actual
    const rect = hero.getBoundingClientRect()
    setOnHero(rect.top < window.innerHeight && rect.bottom > 0)

    obs = new IntersectionObserver(
      ([entry]) => setOnHero(entry.isIntersecting && entry.intersectionRatio > 0.01),
      { threshold: [0, 0.01, 0.1, 0.5, 1] }
    )
    obs.observe(hero)
    return () => { obs && obs.disconnect() }
  }, [pathname])

  const headerCls = onHero
    ? 'bg-transparent text-white'
    : 'bg-white text-neutral-900'
  const linkBase = 'transition'
  const linkCls = onHero ? 'text-white hover:text-[#1F00FF]' : 'text-neutral-800 hover:text-black'
  const ctaCls = 'bg-[#1F00FF] text-white hover:bg-black rounded-full px-4 py-2 transition'

  return (
    <header className={`fixed top-0 inset-x-0 z-40 ${headerCls}`}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="cobalto.blue" className="block">
          <img
            src={onHero ? '/brand/logo-main-white.png' : '/brand/logo-main-blue.png'}
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
              try { localStorage.setItem('lang', 'en') } catch {}
              window.location.reload()
            }}
            className={`${linkBase} ${onHero ? 'text-white/90 hover:text-white' : 'text-neutral-800 hover:text-black'} uppercase tracking-wide`}
            aria-label="Cambiar idioma a inglés"
          >EN</button>
          <Link href="/#contacto" className={ctaCls}>Contáctanos</Link>
        </nav>
      </div>
    </header>
  )
}
