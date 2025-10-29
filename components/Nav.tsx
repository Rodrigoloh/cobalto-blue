"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Nav() {
  // Navbar sólida blanca en todas las páginas
  const headerCls = 'bg-white text-neutral-900 border-b border-neutral-200'
  const linkBase = 'transition'
  const linkCls = 'text-neutral-800 hover:text-black'
  const ctaCls = 'bg-[#1F00FF] text-white hover:bg-black rounded-full px-4 py-2 transition'

  return (
    <header className={`fixed top-0 inset-x-0 z-40 ${headerCls}`}>
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="cobalto.blue" className="block">
          <img
            src={'/brand/logo-main-blue.png'}
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
            className={`${linkBase} text-neutral-800 hover:text-black uppercase tracking-wide`}
            aria-label="Cambiar idioma a inglés"
          >EN</button>
          <Link href="/#contacto" className={ctaCls}>Contáctanos</Link>
        </nav>
      </div>
    </header>
  )
}
