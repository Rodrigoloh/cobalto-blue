'use client'
import Link from 'next/link'

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-white">
          <span className="text-cobalt-300">cobalto</span>.blue
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/work" className="hover:text-white">Work</Link>
          <Link href="/nosotros" className="hover:text-white">Nosotros</Link>
          <Link href="/contacto" className="hover:text-white">Contacto</Link>
          <a href="mailto:hey@cobalto.blue" className="rounded-full border border-cobalt-300/40 px-4 py-2 hover:bg-cobalt-300 hover:text-slate-900 transition">Escríbenos</a>
        </nav>
      </div>
    </header>
  )
}