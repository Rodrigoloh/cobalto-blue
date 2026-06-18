'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type CSSProperties } from 'react'
import { projects as allProjects } from '@/data/projects'

const MENU_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work', badge: 'New projects added' },
  { href: '/nosotros', label: 'About' },
  { href: '/contacto', label: 'Contact' }
]

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-6 w-7" aria-hidden="true">
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? '-rotate-45' : 'translate-y-2'}`} />
    </span>
  )
}

function WorkTopBar() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <div className="relative z-50 grid border-b border-[#0d0d0d] bg-[#0d0d0d] text-white lg:grid-cols-[var(--nosotros-side)_1fr]">
      <Link href="/" className="flex h-16 items-center px-5" aria-label="Ir al home">
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={220}
          height={64}
          priority
          className="h-auto w-full max-w-[220px] object-contain"
        />
      </Link>

      <div className="hidden grid-cols-2 lg:grid">
        <div />
        <div className="grid grid-cols-[72px_1fr_auto] overflow-hidden border border-t-0 border-[#0d0d0d] bg-[#171717] text-sm font-bold">
          <button
            type="button"
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-14 w-[72px] place-items-center border-r border-white/25 transition hover:bg-[#1F00FF]"
          >
            <MenuIcon open={open} />
          </button>
          <nav className="grid grid-cols-3" aria-label="Navegacion principal de Cobalto Blue">
            <Link href="/work" className="grid place-items-center px-3 hover:bg-[#1F00FF]">
              Work
            </Link>
            <Link href="/nosotros" className="grid place-items-center px-3 hover:bg-[#1F00FF]">
              About
            </Link>
            <span aria-disabled="true" className="grid cursor-not-allowed place-items-center px-3 text-white/40">
              Impact
            </span>
          </nav>
          <Link href="/contacto" className="m-2 grid place-items-center rounded-full bg-white px-5 text-[#0d0d0d] transition hover:bg-[#1F00FF] hover:text-white">
            Contact
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="absolute right-0 top-0 grid h-16 w-16 place-items-center border-l border-white/25 bg-[#171717] transition hover:bg-[#1F00FF] lg:hidden"
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" onClick={closeMenu} aria-hidden="true" />
          <aside className="fixed bottom-[76px] left-3 right-3 z-50 max-h-[calc(100svh-96px)] overflow-y-auto border border-[#0d0d0d] bg-white text-[#111322] shadow-2xl lg:bottom-auto lg:left-[var(--nosotros-menu-line)] lg:right-[var(--nosotros-rail)] lg:top-[72px] lg:max-h-[calc(100svh-72px)]">
            <div className="border-b border-[#0d0d0d] bg-[#171717] px-6 py-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Cobalto Blue
            </div>
            <nav>
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex min-h-[88px] items-center justify-between gap-4 border-b border-[#0d0d0d]/15 px-6 text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl ${
                    link.label === 'Work' ? 'bg-[#ccff3f]' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="rounded-full bg-[#1F00FF] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
            <div className="grid gap-5 px-6 py-6">
              <p className="text-sm font-bold uppercase tracking-[0.12em]">Stay connected</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contacto" onClick={closeMenu} className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  Email
                </Link>
                <a href="https://www.instagram.com/" className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  Instagram
                </a>
                <a href="https://wa.me/" className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  )
}

function WorkFooter() {
  return (
    <footer className="grid border-t border-[#0d0d0d] bg-[#0d0d0d] px-5 pb-28 pt-10 text-white sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-12 lg:py-8">
      <div>
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={192}
          height={56}
          className="mb-7 h-auto w-48 lg:hidden"
        />
        <p className="text-sm leading-relaxed text-white/70">
          © 2026 Cobalto.blue
          <br />
          Todos los derechos reservados
        </p>
      </div>
      <nav className="mt-6 flex flex-wrap gap-5 text-xs font-normal text-white/70 lg:mt-0" aria-label="Legal y contacto">
        <Link href="/privacidad" className="hover:text-white">Politicas de privacidad</Link>
        <Link href="/terminos" className="hover:text-white">Terminos y condiciones</Link>
        <a href="mailto:hey@cobalto.blue" className="hover:text-white">Hey@cobalto.blue</a>
      </nav>
      <div className="mt-8 hidden justify-start lg:mt-0 lg:flex lg:justify-end">
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={176}
          height={52}
          className="h-auto w-44"
        />
      </div>
    </footer>
  )
}

export default function WorkPage() {
  return (
    <main
      id="top"
      className="relative bg-black text-white"
      style={{
        '--nosotros-rail': 'clamp(18px, 2vw, 32px)',
        '--nosotros-side': 'clamp(260px, 22.5vw, 420px)',
        '--nosotros-menu-line': 'calc(var(--nosotros-side) + ((100vw - var(--nosotros-rail) - var(--nosotros-side)) / 2))'
      } as CSSProperties}
    >
      <div className="fixed inset-0 -z-10 bg-black" aria-hidden />
      <WorkTopBar />

      <section className="bg-black">
        <div className="grid grid-cols-2 gap-px bg-black portrait-grid-1 md:grid-cols-3">
          {allProjects.map((p) => (
            <div key={p.id} className="group relative block bg-white">
              <div className="aspect-4-3">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cobaltBase/0 opacity-0 transition-all duration-300 group-hover:bg-cobaltBase group-hover:opacity-100">
                <div className="px-6 text-center">
                  <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">{p.title}</h3>
                  <p className="mt-2 font-circularStd text-sm text-white/90 md:text-base">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-8">
          <a href="#top" className="rounded-full bg-cobaltBase px-5 py-2.5 text-sm text-white transition hover:bg-white hover:text-black">Volver arriba</a>
        </div>
      </div>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h3 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            <span className="mr-1 italic text-[#1F00FF]">Nuestros</span> clientes
          </h3>
          <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <button key={n} className="opacity-80 transition hover:opacity-100" aria-label={`Cliente ${n}`}>
                  <img src={`/clients/Cliente${n}.png`} alt={`Cliente ${n}`} className="h-auto w-full" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <WorkFooter />
    </main>
  )
}
