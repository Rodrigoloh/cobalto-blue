import ServicesCarousel from '@/components/ServicesCarousel'
import FooterClean from '@/components/FooterClean'

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

export default function NosotrosPage(){
  return (
    <main className="pt-24">
      {/* Texto inicial */}
      <section className="bg-white text-black">
        <div className="mx-auto max-w-3xl md:max-w-6xl px-6 py-20 md:py-28 text-center">
          <p className="text-xl md:text-2xl leading-relaxed">Cobalto Blue existe para dar forma a las ideas que merecen ser vistas.</p>
          <p className="mt-6 text-xl md:text-2xl leading-relaxed">"Construimos marcas que comunican con claridad y se sienten vivas. En cada proyecto buscamos equilibrio entre lo racional y lo sensorial: estrategia, estética y una narrativa que permanezca."</p>
        </div>
      </section>

      {/* Parallax simple con imagen */}
      <section className="h-[70vh] md:h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/nosotros/parallax.jpg)' }} aria-label="Parallax" />

      {/* Nuestros servicios */}
      <section className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-center text-2xl md:text-3xl font-semibold">
            <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> servicios
          </h3>
          <div className="mt-8">
            <ServicesCarousel items={SERVICES} />
          </div>
        </div>
      </section>

      {/* Nuestro proceso */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="text-center text-2xl md:text-3xl font-semibold"><span className="italic mr-1 text-[#1F00FF]">Nuestro</span> proceso</h3>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PROCESS_STEPS.map((st, idx) => (
              <div key={st.title}>
                <div className="text-[#1F00FF] text-sm mb-2">{String(idx + 1).padStart(2, '0')}</div>
                <div className="text-xl font-semibold">{st.title}</div>
                <p className="mt-2 text-neutral-400 text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer negro */}
      <FooterClean />
    </main>
  )
}
