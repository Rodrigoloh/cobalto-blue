'use client'

import { useRef } from 'react'

type InteractiveLogoGlowProps = {
  src: string
  alt: string
  className?: string
  glow?: 'blue' | 'white'
}

export default function InteractiveLogoGlow({ src, alt, className = '', glow = 'blue' }: InteractiveLogoGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  const color = glow === 'white' ? 'rgba(255,255,255,0.55)' : 'rgba(31,0,255,0.42)'
  const softColor = glow === 'white' ? 'rgba(255,255,255,0.18)' : 'rgba(31,0,255,0.18)'

  const updatePointer = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--logo-x', `${x}%`)
    el.style.setProperty('--logo-y', `${y}%`)
    el.style.setProperty('--logo-opacity', '1')
  }

  return (
    <div
      ref={ref}
      className={`group relative isolate ${className}`}
      style={{
        '--logo-x': '50%',
        '--logo-y': '50%',
        '--logo-opacity': '0.75',
        '--logo-glow': color,
        '--logo-soft': softColor
      } as React.CSSProperties}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.setProperty('--logo-x', '50%')
        el.style.setProperty('--logo-y', '50%')
        el.style.setProperty('--logo-opacity', '0.45')
      }}
    >
      <span
        className="pointer-events-none absolute -inset-8 -z-10 opacity-[var(--logo-opacity)] blur-2xl transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at var(--logo-x) var(--logo-y), var(--logo-glow), var(--logo-soft) 34%, transparent 68%)'
        }}
        aria-hidden="true"
      />
      <img src={src} alt={alt} className="relative z-10 h-auto w-full drop-shadow-[0_18px_44px_rgba(0,0,0,0.18)]" />
    </div>
  )
}
