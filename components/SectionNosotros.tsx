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
      <div className="relative h-[300vh] md:h-[300vh]">
        <div className="sticky top-0 h-screen z-0">
          <img src="/nosotros/parallax.jpg" alt="Parallax" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* C-E. Capas superpuestas en un solo contenedor */}
      <div className="relative -mt-[300vh] z-50">
        {/* Servicios */}
        <section className="min-h-screen flex items-center bg-white text-black border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-6 w-full py-12">
            <h3 className="text-center text-2xl md:text-3xl font-semibold">
              <span className="italic mr-1 text-[#1F00FF]">Nuestros</span> servicios
            </h3>
            <div className="mt-8">
              <ServicesCarousel items={SERVICES} />
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="min-h-screen flex items-center bg-black text-white">
          <div className="mx-auto max-w-7xl px-6 w-full py-12">
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

        {/* Contacto */}
        <section id="contacto" className="min-h-screen flex items-center bg-[#1F00FF] text-white">
          <div className="mx-auto max-w-7xl px-6 w-full py-12">
            <h3 className="text-center text-2xl md:text-3xl font-semibold">
              <span className="italic mr-1 text-white">Nuestro</span>
              <span className="text-black">contacto</span>
            </h3>
            <div className="mt-8 grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-lg text-white/90">
                  Escríbenos a {' '}
                  <a className="underline text-white" href="mailto:hey@cobalto.blue">hey@cobalto.blue</a>
                  {' '}o envíanos un WhatsApp.
                </p>
                <p className="mt-3 text-white/90">
                  <a
                    href="https://wa.me/524422009964?text=Hola! Me interesa conocer más sobre los servicios de Cobalto.blue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
              <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
                <input className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white" placeholder="Nombre" />
                <input className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white" placeholder="Correo electrónico" type="email" />
                <input className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white" placeholder="Teléfono" />
                <textarea className="w-full bg-transparent border-b border-white/60 pb-2 text-white placeholder-white/70 focus:outline-none focus:border-white resize-none" placeholder="Cuéntanos sobre tu proyecto" rows={4} />
                <button className="rounded-full border border-white px-5 py-2.5 text-white hover:bg-white hover:text-[#1F00FF] transition">Enviar</button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* F. Nuestro equipo (oculto) */}
    </section>
  )
}
