import './globals.css'
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'cobalto.blue — Branding & Digital',
  description: 'Are we humans or are we…?'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
