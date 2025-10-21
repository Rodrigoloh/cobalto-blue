'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ServicesCarousel from './ServicesCarousel'

// === Contenido editable ===
// Edita los textos y listas de la sección en las constantes siguientes.
const ABOUT_TEXT: string[] = [
  'Somos un estudio de diseño con enfoque en claridad y atemporalidad.',
  'Unimos estrategia, estética y tecnología para resolver problemas reales de negocio.'
]

type Service = { title: string; desc: string }
const SERVICES: Service[] = [
  { title: 'Diseño Gráfico', desc: 'Identidad visual, sistemas gráficos y aplicaciones.' },
  { title: 'Diseño Web', desc: 'Sitios y experiencias enfocadas en performance y conversión.' },
  { title: 'Programación', desc: 'Front‑end y back‑end con foco en producto digital.' },
  { title: 'Editorial', desc: 'Publicaciones, catálogos y contenido long‑form.' },
  { title: 'Dirección de arte', desc: 'Concepto visual, fotografía y contenido de marca.' },
  { title: 'Dirección creativa', desc: 'Estrategia, narrativa e implementación integral.' }
]

type Step = { title: string; desc: string }
const PROCESS_STEPS: Step[] = [
  { title: 'Research & analysis', desc: 'Comprendemos objetivos y contexto para definir necesidades reales.' },
  { title: 'Strategy & concept', desc: 'Construimos una estrategia cohesionada y un concepto visual sólido.' },
  { title: 'Visual design', desc: 'Desarrollamos identidades y sistemas visuales consistentes.' },
  { title: 'Design application', desc: 'Implementamos el sistema en aplicaciones alineadas al proyecto.' }
]

type Member = { name: string; role: string; image: string }
const TEAM: Member[] = [
  { name: 'Miembro 1', role: 'Dirección creativa', image: '/team/member1.jpg' },
  { name: 'Miembro 2', role: 'Diseño', image: '/team/member2.jpg' },
  { name: 'Miembro 3', role: 'Tecnología', image: '/team/member3.jpg' }
]

// La imagen de parallax debe colocarse en: public/nosotros/parallax.jpg

export default function SectionNosotros(){
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Parallax sutil: la imagen se mueve más lento que el scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="nosotros" className="bg-white text-black">
      {/* A. Texto centrado */}
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        {ABOUT_TEXT.map((p, i) => (
          <p key={i} className={`text-xl md:text-2xl leading-relaxed ${i > 0 ? 'mt-6' : ''}`}>{p}</p>
        ))}
      </div>

      {/* B. Imagen en parallax */}
      <div ref={ref} className="relative h-[38vh] md:h-[52vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src="/nosotros/parallax.jpg" alt="Parallax" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* C. Banner servicios */}
      <div className="bg-white border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h3 className="text-center text-2xl md:text-3xl font-semibold">
            <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> servicios
          </h3>
          <div className="mt-10">
            <ServicesCarousel items={SERVICES} />
          </div>
        </div>
      </div>

      {/* D. Proceso (banner negro) */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h3 className="text-center text-2xl md:text-3xl font-semibold">Nuestro proceso</h3>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PROCESS_STEPS.map((st, idx) => (
              <div key={st.title}>
                <div className="text-[#1F00FF] text-sm mb-2">{String(idx + 1).padStart(2, '0')}</div>
                <div className="text-xl font-semibold">{st.title}</div>
                <p className="mt-2 text-neutral-400 text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* E. Equipo (banner negro con cards hover) */}
      <div className="bg-black text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h3 className="text-center text-2xl md:text-3xl font-semibold">Nuestro equipo</h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                <img src={m.image} alt={m.name} className="w-full h-[320px] md:h-[380px] object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center">
                  <div className="text-center px-6">
                    <div className="text-xl font-semibold">{m.name}</div>
                    <div className="text-sm text-neutral-400 mt-1">{m.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
