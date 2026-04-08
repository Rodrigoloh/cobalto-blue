import './globals.css'
import type { Metadata } from 'next'
import LangProvider from '@/components/LangProvider'
import { ConditionalNav } from '@/components/ConditionalNav'

export const metadata: Metadata = {
  title: 'cobalto.blue — Branding & Digital',
  description: 'Are we humans or are we…?'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>
        <LangProvider />
        <ConditionalNav />
        {children}
      </body>
    </html>
  )
}
