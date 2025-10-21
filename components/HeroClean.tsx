'use client'
import Link from 'next/link'

export default function HeroClean() {
  return (
    <section id="inicio" className="section flex items-center">
      <div className="mx-auto max-w-6xl w-full px-6">
        <p className="text-sm tracking-wider text-neutral-500 uppercase">Estudio</p>
        <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          Branding y Producto Digital con enfoque limpio y atemporal
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600">
          Estrategia, diseño y tecnología para marcas que buscan claridad. Menos ruido, más intención.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 hover:bg-neutral-800 transition"
          >
            Contáctanos
          </Link>
          <Link href="/work" className="text-neutral-700 hover:underline">
            Ver proyectos
          </Link>
        </div>
      </div>
    </section>
  )
}

