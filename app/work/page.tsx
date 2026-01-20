"use client"
import FooterClean from '@/components/FooterClean'
import { projects as allProjects } from '@/data/projects'

export default function WorkPage(){
  return (
    <main id="top" className="relative pt-[var(--nav-h)]">
      {/* Fondo fijo negro para que no se vea blanco al estirar el scroll */}
      <div className="fixed inset-0 -z-10 bg-black" aria-hidden />

      {/* 3.a Galería */}
      <section className="bg-black">
        <div className="grid grid-cols-2 md:grid-cols-3 portrait-grid-1 gap-px bg-black">
          {allProjects.map((p) => (
            <div key={p.id} className="group relative block bg-white">
              <div className="aspect-4-3">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cobaltBase/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-cobaltBase">
                <div className="px-6 text-center">
                  <h3 className="font-bold text-white text-2xl md:text-3xl leading-tight">{p.title}</h3>
                  <p className="mt-2 font-circularStd text-white/90 text-sm md:text-base">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.b Banner inferior con Volver arriba */}
      <div className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-center">
          <a href="#top" className="rounded-full bg-cobaltBase text-white hover:bg-white hover:text-black transition px-5 py-2.5 text-sm">Volver arriba</a>
        </div>
      </div>

      {/* 3.c Logos de clientes (placeholders) */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-8">
            <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> clientes
          </h3>
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

      {/* 3.d Footer */}
      <FooterClean />
    </main>
  )
}
