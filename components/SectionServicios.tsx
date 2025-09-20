'use client'
import Image from 'next/image'

const servicios = [
  'Diseño gráfico',
  'Diseño web',
  'Programación',
  'Editorial',
  'Dirección de arte',
  'Dirección creativa',
]

export default function SectionServicios(){
  return (
    <section id="servicios" className="section bg-white text-black flex items-center">
      <div className="mx-auto max-w-6xl w-full px-6 pr-safe-right">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/brand/cb_logo-main-black.png" alt="cobalto.blue" width={200} height={60} />
        </div>
        <h2 className="font-neueMachina font-bold text-5xl md:text-7xl leading-none mb-10">Nuestros Servicios</h2>
        <ul className="divide-y divide-black/20">
          {servicios.map((s, idx)=> (
            <li key={s} className="flex items-center justify-between py-6">
              <span className="font-circularStd text-3xl md:text-5xl transition-colors hover:text-cobaltBase">{s}</span>
              <span className="text-sm text-black/50">{String(idx+1).padStart(2,'0')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
