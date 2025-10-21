"use client"
import { useEffect, useMemo, useRef, useState } from 'react'

export type ServiceItem = {
  title: string
  desc: string
}

export default function ServicesCarousel({ items }: { items: ServiceItem[] }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [perView, setPerView] = useState(3)
  const [page, setPage] = useState(0)

  // Compute slides per view responsive
  useEffect(() => {
    const compute = () => {
      const w = frameRef.current?.clientWidth ?? window.innerWidth
      const next = w >= 1200 ? 3 : w >= 760 ? 2 : 1
      setPerView(next)
    }
    compute()
    window.addEventListener('resize', compute)
    window.addEventListener('orientationchange', compute)
    return () => {
      window.removeEventListener('resize', compute)
      window.removeEventListener('orientationchange', compute)
    }
  }, [])

  const pages = useMemo(() => Math.max(1, Math.ceil(items.length / perView)), [items.length, perView])
  useEffect(() => { setPage((p) => Math.min(p, pages - 1)) }, [pages])

  const next = () => setPage((p) => (p + 1) % pages)
  const prev = () => setPage((p) => (p - 1 + pages) % pages)

  return (
    <div className="relative">
      <div ref={frameRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${page * 100}%)`, width: `${(items.length / perView) * 100}%` }}
        >
          {items.map((s, i) => (
            <div key={i} style={{ width: `${100 / items.length}%` }} className="px-6 md:px-10">
              <ServiceSlide index={i} item={s} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-[#1F00FF] hover:opacity-80"
      >
        <Arrow dir="left" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-[#1F00FF] hover:opacity-80"
      >
        <Arrow dir="right" />
      </button>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full transition ${i === page ? 'bg-[#1F00FF]' : 'bg-neutral-300'}`}
            onClick={() => setPage(i)}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function ServiceSlide({ index, item }: { index: number; item: ServiceItem }) {
  return (
    <div className="text-center select-none">
      <div className="text-[#1F00FF] font-groteskMono text-lg">{String(index + 1).padStart(2, '0')}</div>
      <div className="mt-2 text-4xl md:text-5xl font-semibold leading-tight text-black">
        {item.title}
      </div>
      <div className="mt-4 text-neutral-500 max-w-md mx-auto">
        {item.desc}
      </div>
    </div>
  )
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  const isLeft = dir === 'left'
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      {isLeft ? (
        <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M10 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

