import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import LangProvider from '@/components/LangProvider'

export const metadata: Metadata = {
  title: 'cobalto.blue — Branding & Digital',
  description: 'Are we humans or are we…?'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <LangProvider />
        <Nav />
        {children}
      </body>
    </html>
  )
}
