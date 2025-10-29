"use client"
import { useMemo, useState } from 'react'
import FooterClean from '@/components/FooterClean'

type Project = {
  id: number
  slug: string
  title: string
  desc: string
  image: string
  rubro: string
}

const RUBROS = ['Ver todos', 'Retail', 'Salud', 'Educación', 'Fashion', 'Wellness', 'Industrias'] as const

const allProjects: Project[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1
  const num = String(n).padStart(2, '0')
  const rubros = ['Retail', 'Salud', 'Educación', 'Fashion', 'Wellness', 'Industrias']
  return {
    id: n,
    slug: `proyecto-${num}`,
    title: `Proyecto ${num}`,
    desc: 'Pequeña descripción del proyecto.',
    image: `/projects/project${num}.png`,
    rubro: rubros[i % rubros.length],
  }
})

export default function WorkPage(){
  const [active, setActive] = useState<(typeof RUBROS)[number]>('Ver todos')
  const filtered = useMemo(() => active === 'Ver todos' ? allProjects : allProjects.filter(p => p.rubro === active), [active])

  return (
    <main id="top">
      {/* 3.a Barra superior de filtros: fondo negro desde el píxel 0 hasta antes de los tiles, detrás de la navbar */}
      <div className="relative z-0 -mt-[var(--nav-h)] pt-[var(--nav-h)] bg-black">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-wrap gap-3 items-center justify-center">
          {RUBROS.map((r) => (
            <button
              key={r}
              onClick={() => setActive(r)}
              className={`text-sm px-4 py-2 rounded-full transition ${
                active === r
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-cobaltBase'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 3.b Galería */}
      <section className="bg-white">
        <div className="grid grid-cols-2 portrait-grid-1 gap-px bg-black">
          {filtered.map((p) => (
            <a key={p.id} href={`/work/${p.slug}`} className="group relative block bg-white" aria-label={p.title}>
              <div className="aspect-[4/3]">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cobaltBase/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-cobaltBase">
                <div className="px-6 text-center">
                  <h3 className="font-neueMachina text-white text-2xl md:text-3xl leading-tight">{p.title}</h3>
                  <p className="mt-2 font-circularStd text-white/90 text-sm md:text-base">{p.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3.c Banner inferior con Volver arriba */}
      <div className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-center">
          <a href="#top" className="rounded-full bg-cobaltBase text-white hover:bg-white hover:text-black transition px-5 py-2.5 text-sm">Volver arriba</a>
        </div>
      </div>

      {/* 3.d Logos de clientes (placeholders) */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h3 className="text-lg md:text-xl mb-6">Clientes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {Array.from({ length: 6 }, (_, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <button key={n} className="opacity-80 hover:opacity-100 transition" aria-label={`Cliente ${n}`}>
                  <img src={`/clients/Cliente${n}.png`} alt={`Cliente ${n}`} className="w-full h-auto" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3.e Footer */}
      <FooterClean />
    </main>
  )
}
