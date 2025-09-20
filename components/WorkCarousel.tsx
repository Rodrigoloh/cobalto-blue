"use client"
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Project = {
  id: number
  title: string
  summary: string
  image: string
  href?: string
}

const projects: Project[] = [
  { id: 1, title: 'Driving marketing campaigns to new creative heights', summary: 'Mercedes-Benz Norway used Vev to supercharge their content, build interest in their cars, and drive valuable conversions.', image: '/work/proyecto-1.jpg', href: 'https://google.com' },
  { id: 2, title: 'The future of immersive web experiences', summary: 'Pfizer’s internal agency Immersive Studio leveled up their digital content to modern standards.', image: '/work/proyecto-2.jpg', href: 'https://google.com' },
  { id: 3, title: 'Workflow optimization for all', summary: 'Schibsted was able to welcome better ideas across their entire company.', image: '/work/proyecto-3.jpg', href: 'https://google.com' },
  { id: 4, title: 'Bold brand launches', summary: 'Launching digital-first brands with impact and consistency across channels.', image: '/work/proyecto-4.jpg', href: 'https://google.com' },
  { id: 5, title: 'Interactive editorial design', summary: 'Turning long-form content into engaging, measurable experiences.', image: '/work/proyecto-5.jpg', href: 'https://google.com' },
  { id: 6, title: 'Experiential campaigns', summary: 'IRL activations with digital layers to extend reach and conversion.', image: '/work/proyecto-6.jpg', href: 'https://google.com' },
]

export default function WorkCarousel() {
  const [index, setIndex] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)
  const [dx, setDx] = useState(380) // desplazamiento lateral
  const [cardW, setCardW] = useState(560)
  const [cardH, setCardH] = useState(560)
  const [compact, setCompact] = useState(false) // vista compacta: solo tarjeta central

  const go = (n: number) => setIndex(((n % projects.length) + projects.length) % projects.length)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // Cálculo de desplazamiento según ancho del frame
  useLayoutEffect(() => {
    const clamp = (v:number, a:number, b:number)=> Math.max(a, Math.min(b, v))
    const compute = () => {
      const frameWidth = frameRef.current?.clientWidth ?? window.innerWidth
      // Tarjeta casi cuadrada y más pequeña
      const cw = clamp(Math.round(frameWidth * 0.36), 380, 560)
      const ch = cw // cuadrada
      setCardW(cw)
      setCardH(ch)
      // Separación exacta para que laterales queden dentro del viewport
      const safeGap = 24
      const maxByViewport = Math.max(0, Math.floor((frameWidth - cw) / 2 - safeGap))
      const suggested = Math.round(cw * 0.78)
      setDx(clamp(suggested, 160, maxByViewport))
      // Modo compacto cuando el viewport es angosto
      setCompact(frameWidth < 960)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Teclado ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  // Swipe táctil básico
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    let startX = 0
    let dxMove = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; dxMove = 0 }
    const onMove  = (e: TouchEvent) => { dxMove = e.touches[0].clientX - startX }
    const onEnd   = () => { if (Math.abs(dxMove) > 60) (dxMove < 0 ? next() : prev()) }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
  }, [index])

  return (
    <section id="work" className="section no-snap text-white flex items-center" aria-label="Trabajos">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-8 relative">
        <h2 className="font-neueMachina text-4xl md:text-5xl absolute top-0 left-4 md:left-0">Work</h2>

        {/* Marco 3‑tarjetas centrado por el contenedor (evita desplazamiento a la derecha) */}
        <div
          ref={frameRef}
          className="group relative h-[70vh] max-h-[640px]"
          style={{ width: '100vw', marginLeft: 'calc(50vw - 50%)', marginRight: 'calc(50vw - 50%)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Renderizamos izquierda/centro/derecha o sólo centro si compact */}
            {(compact ? [0] : [-1, 0, 1] as const).map((offset) => {
              const i = ((index + projects.length + offset) % projects.length)
              const p = projects[i]
              const isCenter = offset === 0
              const x = offset * dx
              const scale = isCenter ? 1 : 0.92
              const opacity = isCenter ? 1 : 0.38
              const z = isCenter ? 20 : 10
              const fadeSide = offset === -1 ? 'left' : offset === 1 ? 'right' : 'none'

              if (isCenter) {
                return (
                  <motion.a
                    key={`${p.id}-${offset}`}
                    href={p.href || 'https://google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    style={{ width: cardW, height: cardH, zIndex: z }}
                    initial={false}
                    animate={{ x, scale, opacity }}
                    transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                    aria-label={p.title}
                  >
                    <div className="relative shadow-xl rounded-2xl border border-white/15 bg-white text-black overflow-hidden h-full grid grid-rows-[1fr_auto]">
                      <div className="relative overflow-hidden">
                        <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-5 md:p-6">
                        <div className="text-sm text-black/60 mb-1">Bertel • Steen</div>
                        <h3 className="font-circularStd text-lg md:text-xl leading-snug line-clamp-2">{p.title}</h3>
                      </div>
                    </div>
                  </motion.a>
                )
              }
              return (
                <motion.div
                  key={`${p.id}-${offset}`}
                  className="block pointer-events-none"
                  style={{ width: cardW, height: cardH, zIndex: z }}
                  initial={false}
                  animate={{ x, scale, opacity }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  aria-hidden
                >
                  <div className="relative shadow-xl rounded-2xl border border-white/15 bg-white text-black overflow-hidden h-full grid grid-rows-[1fr_auto]">
                    <div className="relative overflow-hidden">
                      <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                      {fadeSide !== 'none' && (
                        <div
                          className={
                            `pointer-events-none absolute inset-0 ${
                              fadeSide === 'left'
                                ? 'bg-gradient-to-r from-white/80 via-white/30 to-transparent'
                                : 'bg-gradient-to-l from-white/80 via-white/30 to-transparent'
                            }`
                          }
                        />
                      )}
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="text-sm text-black/60 mb-1">Bertel • Steen</div>
                      <h3 className="font-circularStd text-lg md:text-xl leading-snug line-clamp-2">{p.title}</h3>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        
          {/* Flechas: sólo visibles on hover del frame */}
          {!compact && (
            <>
              <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition absolute inset-y-0 left-0 flex items-center">
                <ArrowBtn dir="left" onClick={prev} />
              </div>
              <div className="pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition absolute inset-y-0 right-0 flex items-center">
                <ArrowBtn dir="right" onClick={next} />
              </div>
            </>
          )}
        </div>

        {/* Flechas siempre visibles debajo en modo compacto */}
        {compact && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <ArrowBtn dir="left" onClick={prev} />
            <ArrowBtn dir="right" onClick={next} />
          </div>
        )}
      </div>
    </section>
  )
}

function ArrowBtn({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  const isLeft = dir === 'left'
  return (
    <button
      onClick={onClick}
      className="m-2 h-10 w-10 grid place-items-center rounded-full bg-white/90 text-black hover:bg-white focus:outline-none"
      aria-label={isLeft ? 'Anterior' : 'Siguiente'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        {isLeft ? (
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}
