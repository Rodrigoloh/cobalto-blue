import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Cobalto.blue — Branding & MKT digital',
  description: 'Diseño que se siente real. Tecnología que mueve el negocio.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 selection:bg-cobalt-200/40 selection:text-slate-900">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}