'use client'
import Link from 'next/link'

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-neutral-900">
          cobalto.blue
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <Link href="/work" className="hover:text-black">Proyectos</Link>
          <Link href="/nosotros" className="hover:text-black">Nosotros</Link>
          <Link href="/contacto" className="hover:text-black">Contacto</Link>
          <a href="mailto:hey@cobalto.blue" className="rounded-full border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white transition">Contáctanos</a>
        </nav>
      </div>
    </header>
  )
}
