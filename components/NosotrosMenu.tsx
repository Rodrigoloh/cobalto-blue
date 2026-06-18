'use client'

import Link from 'next/link'
import { useState } from 'react'

const MENU_LINKS = [
  { href: '/work', label: 'Work', badge: 'New projects added' },
  { href: '/nosotros', label: 'About' },
  { href: '/cb-lab/reporting', label: 'Impact', disabled: true },
  { href: '#expertise', label: 'Services', expandable: true },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ', badge: 'AI ready' }
]

const SERVICE_LINKS = [
  'SaaS y plataformas web',
  'Sistemas internos',
  'Websites de performance',
  'Automatizacion e integraciones'
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

export default function NosotrosMenu() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const closeMenu = () => {
    setOpen(false)
    setServicesOpen(false)
  }

  return (
    <>
      <div data-nosotros-menu className="nosotros-menu fixed bottom-3 left-3 z-50 grid overflow-hidden border border-[#0d0d0d] bg-[#171717] text-sm font-bold text-white lg:hidden">
        <button
          type="button"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-14 w-14 place-items-center transition hover:bg-[#1F00FF]"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div className="nosotros-menu pointer-events-none fixed left-0 right-[var(--nosotros-rail)] top-[var(--nosotros-top-offset,56px)] z-50 hidden grid-cols-[var(--nosotros-side)_1fr] transition-[top] duration-200 lg:grid">
        <div />
        <div className="grid grid-cols-2">
          <div />
          <div data-nosotros-menu className="pointer-events-auto grid grid-cols-[72px_1fr_auto] overflow-hidden border border-t-0 border-[#0d0d0d] bg-[#171717] text-sm font-bold text-white">
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
      </div>

      {open ? (
        <div className="nosotros-menu fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" onClick={closeMenu} aria-hidden="true" />
      ) : null}

      <aside
        className={`nosotros-menu fixed bottom-[76px] left-3 right-3 z-50 max-h-[calc(100svh-96px)] overflow-y-auto border border-[#0d0d0d] bg-white text-[#111322] shadow-2xl transition duration-300 lg:bottom-auto lg:left-[var(--nosotros-menu-line)] lg:right-[var(--nosotros-rail)] lg:top-[calc(var(--nosotros-top-offset,56px)+56px)] lg:max-h-[calc(100svh-72px)] lg:w-auto ${
          open ? 'translate-y-0 opacity-100 md:translate-x-0' : 'pointer-events-none translate-y-4 opacity-0 md:translate-x-5 md:translate-y-0'
        }`}
        aria-label="Menu expandido de Cobalto Blue"
      >
        <div className="border-b border-[#0d0d0d] bg-[#171717] px-6 py-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
          Cobalto Blue
        </div>
        <nav>
          {MENU_LINKS.map((link) => (
            <div key={link.label} className="border-b border-[#0d0d0d]/15">
              {link.expandable ? (
                <button
                  type="button"
                  onClick={() => setServicesOpen((value) => !value)}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-6 text-left text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl"
                >
                  <span>{link.label}</span>
                  <span className={`text-xl transition ${servicesOpen ? 'rotate-180' : ''}`}>v</span>
                </button>
              ) : link.disabled ? (
                <span
                  aria-disabled="true"
                  className="flex min-h-[88px] cursor-not-allowed items-center justify-between gap-4 px-6 text-4xl font-bold leading-none text-[#111322]/35 md:text-5xl"
                >
                  <span>{link.label}</span>
                </span>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[88px] items-center justify-between gap-4 px-6 text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl"
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <span className="rounded-full bg-[#1F00FF] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              )}

              {link.expandable && servicesOpen ? (
                <div className="grid gap-0 bg-[#f7f5ef] px-6 py-4">
                  {SERVICE_LINKS.map((service) => (
                    <Link
                      key={service}
                      href="#expertise"
                      onClick={closeMenu}
                      className="border-t border-[#0d0d0d]/15 py-3 text-sm font-bold uppercase tracking-[0.04em] hover:text-[#1F00FF]"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <div className="grid gap-5 px-6 py-6">
          <p className="text-sm font-bold uppercase tracking-[0.12em]">Stay connected</p>
          <div className="flex gap-3">
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
  )
}
