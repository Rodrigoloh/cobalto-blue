import ServicesCarousel from '@/components/ServicesCarousel'
import FooterClean from '@/components/FooterClean'
import NosotrosParallaxSection from '@/components/NosotrosParallaxSection'

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
    <main>
      <NosotrosParallaxSection />

      {/* Servicios + proceso juntos en una pantalla */}
      <div className="h-screen flex flex-col">
        <section className="bg-white text-black flex-1 flex items-center min-h-[50vh]">
          <div className="mx-auto max-w-7xl px-6 py-10 w-full">
            <h3 className="text-center text-2xl md:text-3xl font-bold">
              <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> servicios
            </h3>
            <div className="mt-6">
              <ServicesCarousel items={SERVICES} />
            </div>
          </div>
        </section>

        <section className="bg-black text-white flex-1 flex items-center min-h-[50vh]">
          <div className="mx-auto max-w-7xl px-6 py-10 w-full">
            <h3 className="text-center text-2xl md:text-3xl font-bold"><span className="italic mr-1 text-[#1F00FF]">Nuestro</span> proceso</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((st, idx) => (
                <div key={st.title}>
                  <div className="text-[#1F00FF] text-sm mb-2">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="text-xl font-bold">{st.title}</div>
                  <p className="mt-2 text-neutral-400 text-sm leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer negro */}
      <FooterClean />
    </main>
  )
}
