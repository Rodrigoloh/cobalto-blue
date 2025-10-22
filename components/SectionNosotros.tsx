'use client'
import ServicesCarousel from './ServicesCarousel'

// === Contenido editable ===
// Edita los textos y listas de la sección en las constantes siguientes.
const ABOUT_TEXT: React.ReactNode[] = [
  <>
    <span className="font-semibold text-[#1F00FF]">Cobalto Blue</span> existe para dar forma a las ideas que merecen ser vistas.
  </>,
  <>
    Construimos marcas que comunican con claridad y se sienten vivas. En cada proyecto buscamos equilibrio entre lo racional y lo sensorial: {' '}
    <span className="font-semibold text-[#1F00FF]">estrategia, estética y una narrativa que permanezca.</span>
  </>,
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
  return (
    <section id="nosotros" className="bg-white text-black">
      {/* A. Texto centrado */}
      <div className="mx-auto max-w-3xl px-6 py-36 md:py-44 text-center">
        {ABOUT_TEXT.map((p, i) => (
          <p key={i} className={`text-xl md:text-2xl leading-relaxed ${i > 0 ? 'mt-6' : ''}`}>{p}</p>
        ))}
      </div>

      {/* B. Imagen sticky (efecto cover mientras el contenido sube) */}
      <div className="relative h-[140vh] md:h-[180vh]">
        <div className="sticky top-0 h-screen z-0">
          <img src="/nosotros/parallax.jpg" alt="Parallax" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* C. Banner servicios */}
      <div className="relative z-10 bg-white -mt-[100vh] border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 pt-[72vh] md:pt-[84vh] pb-12 md:pb-16">
          <h3 className="text-center text-2xl md:text-3xl font-semibold">
            <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> servicios
          </h3>
          <div className="mt-6 md:mt-8">
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

      {/* E. Nuestro equipo (oculto) */}
    </section>
  )
}
