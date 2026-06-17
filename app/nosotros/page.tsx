import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import NosotrosBodyClass from '@/components/NosotrosBodyClass'
import NosotrosFAQ from '@/components/NosotrosFAQ'
import NosotrosMenu from '@/components/NosotrosMenu'
import NosotrosProcessLab from '@/components/NosotrosProcessLab'
import NosotrosTopOffset from '@/components/NosotrosTopOffset'

type Expertise = {
  title: string
  desc: string
  items: string[]
  visual: string
  image: string
}

type Person = {
  name: string
  role: string
  focus: string
}

type Faq = {
  q: string
  a: string
}

function SectionLogo({ variant = 'white' }: { variant?: 'white' | 'blue' }) {
  return (
    <img
      src={variant === 'blue' ? 'https://www.cobalto.blue/brand/logo-main-blue.png' : 'https://www.cobalto.blue/brand/logo-main-fullwhite.png'}
      alt="Cobalto Blue"
      className="sticky top-[calc(var(--nosotros-top-offset,0px)+20px)] w-full max-w-[220px] transition-[top] duration-200"
    />
  )
}

const EXPERTISE: Expertise[] = [
  {
    title: 'SaaS y plataformas web',
    desc: 'Productos digitales listos para operar con usuarios, roles, planes, paneles administrativos y flujos de negocio.',
    items: ['MVP SaaS', 'Portales multiusuario', 'Dashboards', 'Backoffice', 'Suscripciones', 'Reportes'],
    visual: 'Panel de producto con metricas, usuarios y modulos activos',
    image: 'https://www.cobalto.blue/projects/project04.png'
  },
  {
    title: 'Sistemas internos',
    desc: 'Herramientas a medida para ordenar procesos comerciales, administrativos, operativos o de servicio al cliente.',
    items: ['CRM interno', 'Inventarios', 'Flujos de aprobacion', 'Gestion documental', 'Operaciones', 'Permisos'],
    visual: 'Mapa operativo con tareas, estados y responsables',
    image: 'https://www.cobalto.blue/projects/project05.png'
  },
  {
    title: 'Websites de performance',
    desc: 'Sitios web comerciales y corporativos con arquitectura clara, contenido legible, velocidad y enfoque en conversion.',
    items: ['Next.js', 'SEO tecnico', 'Landing systems', 'CMS', 'Analitica', 'Core Web Vitals'],
    visual: 'Sistema web con secciones, contenido SEO y medicion',
    image: 'https://www.cobalto.blue/projects/project02.png'
  },
  {
    title: 'Automatizacion e integraciones',
    desc: 'Conectamos herramientas, APIs y datos para reducir tareas manuales y mejorar la visibilidad del negocio.',
    items: ['APIs', 'Pagos', 'CRM', 'Email', 'WhatsApp', 'Dashboards externos'],
    visual: 'Flujo conectado entre herramientas, APIs y reportes',
    image: 'https://www.cobalto.blue/projects/project09.png'
  }
]

const PROCESS = [
  {
    title: 'Discovery & Strategy',
    desc: 'Entendemos el negocio, los usuarios, los objetivos, los datos y la operacion que el sistema debe mejorar.',
    client: 'Definimos prioridades, alcance inicial y criterios de exito.'
  },
  {
    title: 'Architecture & UX',
    desc: 'Dibujamos flujos, estructura de modulos, permisos, pantallas clave y arquitectura tecnica antes de construir.',
    client: 'Validas journeys, contenido y reglas principales.'
  },
  {
    title: 'Product Design',
    desc: 'Creamos una interfaz clara, elegante y eficiente para usuarios reales, con estados, componentes y sistema visual.',
    client: 'Revisas prototipos y decisiones de experiencia.'
  },
  {
    title: 'Development',
    desc: 'Construimos front-end, back-end, integraciones y paneles con una base mantenible, escalable y preparada para iterar.',
    client: 'Probamos con datos reales y ajustamos detalles operativos.'
  },
  {
    title: 'Launch & Growth',
    desc: 'Publicamos, medimos, corregimos y dejamos un roadmap para crecer el producto con nuevas funciones.',
    client: 'Recibes una plataforma lista para operar y evolucionar.'
  }
]

const PRINCIPLES: Person[] = [
  {
    name: 'Empatia',
    role: 'Disenamos para personas',
    focus: 'Entendemos a quienes usan el producto. Resolvemos problemas para que la tecnologia se sienta clara, util y humana.'
  },
  {
    name: 'Significado',
    role: 'No creemos en decorar',
    focus: 'Creemos en diseno con sentido: productos y experiencias que tienen impacto real en las personas y en el negocio.'
  },
  {
    name: 'Optimismo',
    role: 'Construimos futuro',
    focus: 'Vemos oportunidades donde hay friccion. Ayudamos a convertir ideas, procesos y ambiciones en sistemas que avanzan.'
  },
  {
    name: 'Curiosidad',
    role: 'Preguntamos mejor',
    focus: 'Nos interesa la gente, la cultura, la tecnologia y tu negocio. La curiosidad nos ayuda a encontrar mejores decisiones.'
  },
  {
    name: 'Realidad',
    role: 'Disenamos para construir',
    focus: 'Un producto vale por su ejecucion. Pensamos en desarrollo, datos, estados y mantenimiento desde el inicio.'
  },
  {
    name: 'Colaboracion',
    role: 'Negocio y creatividad juntos',
    focus: 'Trabajamos lado a lado para combinar inteligencia racional, criterio creativo y responsabilidad sobre el resultado.'
  }
]

const INDUSTRIES = [
  'Servicios profesionales',
  'Educacion',
  'Retail y ecommerce',
  'Operaciones internas',
  'Startups B2B',
  'Real estate',
  'Salud y bienestar',
  'Comunidades y membresias',
  'Finanzas y administracion',
  'Marketing y ventas',
  'Logistica',
  'Hospitality'
]

const FAQS: Faq[] = [
  {
    q: 'Que hace Cobalto Blue?',
    a: 'Cobalto Blue disena y desarrolla productos digitales, plataformas SaaS, sistemas web, dashboards, automatizaciones e integraciones para empresas que necesitan operar mejor.'
  },
  {
    q: 'Trabajan con startups o empresas establecidas?',
    a: 'Si. Podemos construir MVPs para validar una idea, modernizar sistemas existentes o crear herramientas internas para equipos que ya operan y necesitan escalar.'
  },
  {
    q: 'Pueden trabajar con nuestro equipo interno?',
    a: 'Si. Podemos actuar como equipo externo completo o integrarnos con equipos de marketing, operaciones, producto, diseno o tecnologia.'
  },
  {
    q: 'Tambien hacen branding y diseno visual?',
    a: 'Si, pero ahora lo usamos como parte del producto digital. La identidad, el contenido y la interfaz deben ayudar a que el sistema sea claro, confiable y facil de vender.'
  },
  {
    q: 'Como usan AI en el proceso?',
    a: 'Usamos AI como apoyo para investigacion, estructura de contenido, analisis de patrones, documentacion y aceleracion de prototipos. Las decisiones finales de estrategia, diseno y desarrollo se revisan por el equipo.'
  },
  {
    q: 'Que necesito para pedir una cotizacion?',
    a: 'Lo ideal es compartir el objetivo del sistema, usuarios principales, procesos que quieres mejorar, herramientas actuales, fechas importantes y presupuesto estimado.'
  }
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Cobalto Blue',
  url: 'https://cobalto.blue/nosotros',
  description:
    'Estudio de desarrollo digital especializado en plataformas SaaS, sistemas web, automatizacion, integraciones y UX/UI.',
  serviceType: ['SaaS', 'Sistemas web', 'Desarrollo web', 'Automatizacion', 'UX UI'],
  areaServed: ['Mexico', 'Latin America', 'Remote']
}

export const metadata: Metadata = {
  title: 'Nosotros | Cobalto Blue - SaaS, sistemas web y servicios digitales',
  description:
    'Cobalto Blue desarrolla plataformas SaaS, sistemas web, websites de performance, automatizaciones e integraciones para empresas que quieren operar mejor.',
  openGraph: {
    title: 'Cobalto Blue - SaaS, sistemas web y servicios digitales',
    description:
      'Un estudio de producto digital para crear sistemas web claros, escalables y bien disenados.',
    url: 'https://cobalto.blue/nosotros',
    siteName: 'Cobalto Blue',
    type: 'website'
  }
}

export default function NosotrosPage() {
  return (
    <main
      className="relative bg-[#f7f5ef] text-[#0d0d0d] md:pr-[var(--nosotros-rail)]"
      style={{
        '--nosotros-rail': 'clamp(18px, 2vw, 32px)',
        '--nosotros-side': 'clamp(260px, 22.5vw, 420px)',
        '--nosotros-menu-line': 'calc(var(--nosotros-side) + ((100vw - var(--nosotros-rail) - var(--nosotros-side)) / 2))'
      } as CSSProperties}
    >
      <NosotrosBodyClass />
      <NosotrosTopOffset />
      <NosotrosMenu />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none fixed bottom-0 right-0 top-0 z-30 hidden w-[var(--nosotros-rail)] border-l border-[#0d0d0d] bg-[#f7f5ef] md:block" aria-hidden="true" />

      <section id="about-hero" className="grid min-h-[100svh] grid-rows-[auto_1fr] border-b border-[#0d0d0d]">
        <div className="flex h-14 w-full items-center justify-center bg-[#0d0d0d] px-5 text-center text-sm font-bold uppercase tracking-[0.08em] text-white md:text-base">
          Let&apos;s build something
        </div>

        <div className="grid lg:grid-cols-[var(--nosotros-side)_1fr]">
          <aside className="hidden border-r border-[#0d0d0d] bg-[#1F00FF] p-5 lg:block" aria-label="Cobalto Blue">
            <SectionLogo />
          </aside>
          <div className="grid px-5 pb-24 pt-6 text-left sm:px-8 md:pb-20 lg:content-end lg:px-12 lg:pb-14 lg:pt-24">
            <img
              src="/brand/logo-mobile-cobalto-blue.svg"
              alt="Cobalto Blue"
              className="mx-auto mb-10 w-[min(88vw,380px)] lg:hidden"
            />
            <div className="mt-auto">
              <h1 className="max-w-full text-[clamp(3rem,15vw,5.25rem)] font-bold leading-[0.88] tracking-normal md:text-[clamp(3.2rem,9vw,9rem)] md:leading-[0.86] lg:max-w-5xl">
                <span className="block md:hidden">
                  Digital
                  <br />
                  systems
                  <br />
                  for real
                  <br />
                  operations.
                </span>
                <span className="hidden md:inline">Digital systems for real operations.</span>
              </h1>
              <div className="mt-5 border-t border-[#0d0d0d] pt-4 md:mt-8 md:pt-6">
                <p className="max-w-[92vw] text-lg font-bold leading-tight md:text-3xl lg:max-w-4xl">
                  Construimos desarrollos y plataformas digitales para empresas que necesitan operar, vender y escalar con claridad. Más de una decada de experiencia nos respalda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="relative min-h-[88svh] overflow-hidden border-b border-[#0d0d0d] bg-[#0d0d0d] text-white">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center opacity-65"
          style={{ backgroundImage: 'url(https://www.cobalto.blue/projects/project05.png)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative z-10 grid min-h-[88svh] content-end px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <h2 className="max-w-full text-[clamp(2.8rem,13vw,5rem)] font-bold leading-[0.92] md:max-w-4xl md:text-[clamp(3rem,7vw,7rem)] md:leading-[0.9]">
            Software con pensamiento de producto.
          </h2>
          <div className="mt-8 max-w-full space-y-4 text-lg font-bold leading-tight text-white md:max-w-3xl md:text-2xl">
            <p>
              Un sistema no es una coleccion de pantallas. Es una forma de ordenar decisiones, personas, datos y tareas.
            </p>
            <p className="text-white/70 md:whitespace-nowrap">
              Menos promesas abstractas. Mas producto funcionando.
            </p>
          </div>
        </div>
      </section>

      <section id="expertise" data-expertise-section className="grid scroll-mt-24 border-b border-[#0d0d0d] bg-white lg:grid-cols-[var(--nosotros-side)_1fr]">
        <aside className="hidden border-r border-[#0d0d0d] bg-[#0d0d0d] p-5 text-white lg:block">
          <SectionLogo />
        </aside>
        <div>
          <div className="border-b border-[#0d0d0d] bg-[#1F00FF] px-5 py-12 text-white sm:px-8 lg:px-12">
            <h2 className="text-4xl font-bold leading-none md:text-7xl">Alcances y servicios</h2>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-white/80">
              Creamos sistemas completos o partes especificas de una operacion digital. Cada alcance se define por objetivos, usuarios, datos y nivel de complejidad.
            </p>
          </div>

          <div className="grid">
            {EXPERTISE.map((item) => (
              <article key={item.title} data-expertise-row className="grid border-b border-[#0d0d0d] md:grid-cols-2">
                <div className="p-5 sm:p-8 lg:p-10">
                  <h3 className="text-3xl font-bold leading-none text-[#1F00FF] md:text-5xl">{item.title}</h3>
                  <p className="mt-6 text-lg leading-relaxed text-neutral-700">{item.desc}</p>
                  <ul className="mt-8 grid gap-2 text-sm font-bold uppercase text-[#0d0d0d]">
                    {item.items.map((subitem) => (
                      <li key={subitem} className="border-t border-[#0d0d0d]/20 pt-2">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-expertise-visual className="border-t border-[#0d0d0d] bg-white md:border-l md:border-t-0">
                  <div className="relative min-h-[360px] overflow-hidden bg-white md:min-h-full">
                    <img
                      src={item.image}
                      alt={item.visual}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NosotrosProcessLab />

      <section id="team" className="grid scroll-mt-24 border-b border-[#0d0d0d] bg-white lg:grid-cols-[var(--nosotros-side)_1fr]">
        <aside className="hidden border-r border-[#0d0d0d] bg-[#f7f5ef] lg:block" aria-hidden="true" />
        <div>
          <div className="border-b border-[#0d0d0d] px-5 py-12 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-bold leading-none md:text-7xl">Nos guian 6 principios.</h2>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-neutral-700">
              Son criterios simples para disenar y construir productos digitales con claridad, responsabilidad y sentido.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((person) => (
              <article key={person.name} className="border-b border-r border-[#0d0d0d] p-5 sm:min-h-[330px] sm:p-8">
                <p className="text-sm font-bold uppercase text-[#1F00FF]">{person.role}</p>
                <h3 className="mt-8 text-4xl font-bold leading-none">{person.name}</h3>
                <p className="mt-6 text-lg leading-relaxed text-neutral-700">{person.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid border-b border-[#0d0d0d] bg-[#f7f5ef] lg:grid-cols-[var(--nosotros-side)_1fr]">
        <aside className="hidden overflow-hidden border-r border-[#0d0d0d] bg-white lg:block">
          <img
            src="https://www.cobalto.blue/projects/project06.gif"
            alt="Ejemplo visual de proyectos digitales de Cobalto Blue"
            className="sticky top-0 h-screen w-full object-cover"
            loading="lazy"
          />
        </aside>
        <div className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-4xl font-bold leading-none md:text-7xl">Donde podemos ayudar</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-lg font-bold uppercase md:grid-cols-3">
              {INDUSTRIES.map((industry) => (
                <p key={industry} className="border-t border-[#0d0d0d] pt-3">{industry}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="grid scroll-mt-24 border-b border-[#0d0d0d] bg-white text-[#0d0d0d] lg:grid-cols-[var(--nosotros-side)_1fr]">
        <aside className="hidden border-r border-[#0d0d0d] bg-[#1F00FF] p-5 lg:block">
          <SectionLogo />
        </aside>
        <div className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <h2 className="text-4xl font-bold leading-none md:text-7xl">Preguntas frecuentes</h2>
          <NosotrosFAQ items={FAQS} />
        </div>
      </section>

      <section className="grid min-h-[100svh] border-b border-[#0d0d0d] bg-[#1F00FF] text-white lg:grid-cols-[var(--nosotros-side)_1fr]">
        <aside className="hidden border-r border-white/30 bg-[#0d0d0d] lg:block" aria-hidden="true" />
        <div className="grid min-h-[100svh] content-end px-5 pb-10 pt-32 sm:px-8 md:pb-14 lg:px-12 lg:pb-20 lg:pt-32">
          <h2 className="max-w-6xl text-[clamp(3.5rem,10vw,10rem)] font-bold leading-[0.84]">
            Ready to build what works?
          </h2>
          <div className="mt-10 grid gap-6 border-t border-white/40 pt-6 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-2xl text-xl font-bold leading-snug">
              Si tienes una idea, un proceso roto o una plataforma que necesita evolucionar, podemos convertirlo en un sistema digital claro.
            </p>
            <Link href="/contacto" className="w-max border border-white px-5 py-3 text-sm font-bold uppercase text-white hover:bg-white hover:text-[#1F00FF]">
              Empezar conversacion
            </Link>
          </div>
        </div>
      </section>

      <footer className="grid border-t border-[#0d0d0d] bg-[#0d0d0d] px-5 pb-28 pt-10 text-white sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-12 lg:py-8">
        <div>
          <img
            src="https://www.cobalto.blue/brand/logo-main-fullwhite.png"
            alt="Cobalto Blue"
            className="mb-7 w-48 lg:hidden"
            loading="lazy"
          />
          <p className="text-sm leading-relaxed text-white/70">
            © 2026 Cobalto.blue
            <br />
            Todos los derechos reservados
          </p>
        </div>
        <nav className="mt-6 flex flex-wrap gap-5 text-xs font-normal text-white/70 lg:mt-0" aria-label="Legal y contacto">
          <Link href="/privacidad" className="hover:text-white">Politicas de privacidad</Link>
          <Link href="/terminos" className="hover:text-white">Terminos y condiciones</Link>
          <a href="mailto:hey@cobalto.blue" className="hover:text-white">Hey@cobalto.blue</a>
        </nav>
        <div className="mt-8 hidden justify-start lg:mt-0 lg:flex lg:justify-end">
          <img
            src="https://www.cobalto.blue/brand/logo-main-fullwhite.png"
            alt="Cobalto Blue"
            className="w-44"
            loading="lazy"
          />
        </div>
      </footer>
    </main>
  )
}
