'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useTransform, type MotionStyle } from 'framer-motion'
import {
  Activity,
  Database,
  FileCode,
  Globe,
  Layers,
  MousePointer2
} from 'lucide-react'
import { projects } from '@/data/projects'

const statements = [
  {
    type: 'logo',
    src: '/brand/logo-main-fullwhite.png',
    alt: 'Cobalto Blue'
  },
  {
    type: 'text',
    text: 'Ideas claras.'
  },
  {
    type: 'text',
    text: 'Productos vivos.'
  }
] as const

const menuLinks = [
  { href: '#gif-section', label: 'Intro visual' },
  { href: '#pain-points', label: 'Pain points' },
  { href: '#paths', label: 'Paths' },
  { href: '#work-carousel', label: 'Work' }
]

const nosotrosLinks = [
  { href: '/nosotros', label: 'About' },
  { href: '/nosotros#expertise', label: 'Services' },
  { href: '/nosotros#process', label: 'Process' },
  { href: '/nosotros#faq', label: 'FAQ' }
]

const directMenuLinks = [
  { href: '/work', label: 'Work' },
  { href: '/contacto', label: 'Contacto' }
]

const marqueeItems = [
  'SaaS y plataformas web',
  'Sistemas internos',
  'Websites de performance',
  'Automatizacion'
]

const painPoints = [
  {
    title: 'Operación invisible',
    desc: 'Tu equipo pierde horas en tareas manuales que un sistema debería resolver en segundos.',
    icon: <MousePointer2 className="text-[#1F00FF]" size={28} />
  },
  {
    title: 'Ventas con fricción',
    desc: 'Tu sitio actual no proyecta la calidad de tu servicio. El cliente duda antes de contactar.',
    icon: <Activity className="text-[#1F00FF]" size={28} />
  },
  {
    title: 'Datos dispersos',
    desc: 'Información en excels, chats y correos. No hay claridad para tomar decisiones de escala.',
    icon: <Database className="text-[#1F00FF]" size={28} />
  }
]

const paths = [
  {
    title: 'Onepager site',
    weeks: '2-3 semanas',
    desc: 'Presencia de alto impacto para validar y aterrizar tu propuesta de valor rápido.',
    icon: <FileCode size={32} />
  },
  {
    title: 'Full website',
    weeks: '3-6 semanas',
    desc: 'Arquitectura completa, SEO y múltiples secciones para empresas con oferta compleja.',
    icon: <Globe size={32} />
  },
  {
    title: 'Website growth',
    weeks: '4-6 semanas',
    desc: 'Automatización, CRM, flujos de Email y onboarding para escalar tu operación.',
    icon: <Layers size={32} />
  }
]

const specialties = ['Website Sprint', 'SaaS MVP', 'Brand + Web System', 'Internal Ops Tool']
const carouselProjects = projects.slice(0, 12)

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-6 w-7" aria-hidden="true">
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? 'rotate-45' : '-translate-y-2'}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-current transition ${open ? '-rotate-45' : 'translate-y-2'}`} />
    </span>
  )
}

function HomeSectionLogo() {
  return (
    <div className="sticky top-0 z-40 -mb-16 hidden h-16 md:mr-[var(--nosotros-rail)] lg:grid lg:grid-cols-[var(--nosotros-side)_1fr]">
      <Link href="/" className="flex h-16 items-center px-5">
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={220}
          height={64}
          className="h-auto w-full max-w-[220px] object-contain"
        />
      </Link>
    </div>
  )
}

function useContentRailY(targetRef: RefObject<HTMLElement>, thumbHeight = 88) {
  const { scrollY } = useScroll()
  const y = useMotionValue(0)

  useEffect(() => {
    const updatePosition = () => {
      const target = targetRef.current
      if (!target) return

      const rect = target.getBoundingClientRect()
      const start = rect.top + window.scrollY
      const end = Math.max(start + 1, start + target.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, (scrollY.get() - start) / (end - start)))
      y.set(progress * Math.max(0, window.innerHeight - thumbHeight))
    }

    const unsubscribe = scrollY.on('change', updatePosition)
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('load', updatePosition)
    return () => {
      unsubscribe()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('load', updatePosition)
    }
  }, [scrollY, targetRef, thumbHeight, y])

  return y
}

function HomeFloatingMenu({ targetRef, variant = 'desktop' }: { targetRef: RefObject<HTMLElement>, variant?: 'desktop' | 'mobile' }) {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'home' | 'nosotros' | null>('home')
  const y = useContentRailY(targetRef, 64)
  const isMobile = variant === 'mobile'

  const closeMenu = () => {
    setOpen(false)
    setActiveDropdown('home')
  }

  return (
    <>
      <div className={isMobile ? 'fixed bottom-3 left-3 z-[100] grid h-14 w-14 overflow-hidden border border-[#0d0d0d] bg-[#171717] text-sm font-bold text-white md:hidden' : 'pointer-events-none sticky top-0 z-[80] h-screen w-16'}>
        <motion.div
          className={isMobile ? 'pointer-events-auto grid h-14 w-14 place-items-center' : 'pointer-events-auto absolute left-0 top-0 grid h-16 w-full overflow-hidden border border-[#0d0d0d] bg-[#171717] text-sm font-bold text-white'}
          style={isMobile ? undefined : { y }}
        >
          <button
            type="button"
            aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={isMobile ? 'grid h-14 w-14 place-items-center transition hover:bg-[#1F00FF]' : 'grid h-16 w-16 place-items-center transition hover:bg-[#1F00FF]'}
          >
            <MenuIcon open={open} />
          </button>
        </motion.div>
      </div>

      {open ? (
        <>
          <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px]" onClick={closeMenu} aria-hidden="true" />
          <aside className="fixed bottom-[76px] left-3 right-3 z-[90] max-h-[calc(100svh-96px)] overflow-y-auto border border-[#0d0d0d] bg-white text-[#111322] shadow-2xl lg:bottom-auto lg:left-auto lg:right-[var(--nosotros-rail)] lg:top-16 lg:w-[min(620px,calc(100vw-var(--nosotros-rail)-24px))] lg:max-h-[calc(100svh-72px)]">
            <div className="border-b border-[#0d0d0d] bg-[#171717] px-6 py-5 text-sm font-bold uppercase tracking-[0.08em] text-white">
              Cobalto Blue
            </div>
            <nav>
              <div className="border-b border-[#0d0d0d]/15" onMouseEnter={() => setActiveDropdown('home')}>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-6 text-left text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl"
                >
                  <span>Home</span>
                  <span className={`text-xl transition ${activeDropdown === 'home' ? 'rotate-180' : ''}`}>v</span>
                </Link>
                {activeDropdown === 'home' ? (
                  <div className="grid gap-0 bg-[#f7f5ef] px-6 py-4">
                    {menuLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeMenu}
                        className="border-t border-[#0d0d0d]/15 py-3 text-sm font-bold uppercase tracking-[0.04em] hover:text-[#1F00FF]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="border-b border-[#0d0d0d]/15" onMouseEnter={() => setActiveDropdown('nosotros')}>
                <Link
                  href="/nosotros"
                  onClick={closeMenu}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-6 text-left text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl"
                >
                  <span>Nosotros</span>
                  <span className={`text-xl transition ${activeDropdown === 'nosotros' ? 'rotate-180' : ''}`}>v</span>
                </Link>
                {activeDropdown === 'nosotros' ? (
                  <div className="grid gap-0 bg-[#f7f5ef] px-6 py-4">
                    {nosotrosLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeMenu}
                        className="border-t border-[#0d0d0d]/15 py-3 text-sm font-bold uppercase tracking-[0.04em] hover:text-[#1F00FF]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {directMenuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[88px] items-center justify-between gap-4 border-b border-[#0d0d0d]/15 px-6 text-4xl font-bold leading-none transition hover:bg-[#ccff3f] md:text-5xl"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="grid gap-5 px-6 py-6">
              <p className="text-sm font-bold uppercase tracking-[0.12em]">Stay connected</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contacto" onClick={closeMenu} className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  Email
                </Link>
                <a href="https://www.instagram.com/" className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  Instagram
                </a>
                <a href="https://wa.me/" className="rounded-full border border-[#0d0d0d] px-4 py-2 text-sm font-bold hover:bg-[#0d0d0d] hover:text-white">
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </>
  )
}

function ServicesMarquee() {
  const repeatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className="relative z-30 overflow-hidden border-y border-[#0d0d0d] bg-[#0d0d0d] py-3 text-white md:py-4" aria-label="Servicios principales">
      <div className="home-marquee-track inline-flex whitespace-nowrap">
        {repeatedItems.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center font-bold uppercase leading-none tracking-normal">
            <span className="px-4 text-[clamp(1rem,2.4vw,2rem)] md:px-5">{item}</span>
            <span className="h-3 w-3 rounded-full bg-[#ccff3f] md:h-4 md:w-4" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}

function ScrollPositionRail({ targetRef }: { targetRef: RefObject<HTMLElement> }) {
  const y = useContentRailY(targetRef, 64)

  return (
    <div className="pointer-events-none sticky top-0 z-40 hidden h-screen w-[var(--nosotros-rail)] bg-[#0d0d0d] md:block" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 h-16 w-full bg-[#ccff3f]"
        style={{ y }}
      />
    </div>
  )
}

function PainPointsSection() {
  return (
    <section id="pain-points" className="grid scroll-mt-20 border-b border-[#0d0d0d] bg-white text-[#0d0d0d] md:mr-[var(--nosotros-rail)] lg:grid-cols-[var(--nosotros-side)_1fr]">
      <aside className="hidden border-r border-[#0d0d0d] bg-[#1F00FF] lg:block" aria-hidden="true" />

      <div>
        <div className="border-b border-[#0d0d0d] bg-[#0d0d0d] px-5 py-10 text-white sm:px-8 lg:px-12">
          <h2 className="max-w-5xl text-4xl font-bold leading-none md:text-7xl">
            Problemas que resolvemos.
          </h2>
        </div>
        <div className="grid gap-0 md:grid-cols-3">
          {painPoints.map((pain) => (
            <article key={pain.title} className="border-b border-r border-[#0d0d0d] p-5 sm:min-h-[320px] sm:p-8">
              <div className="mb-10">{pain.icon}</div>
              <h3 className="text-3xl font-bold leading-none text-[#0d0d0d]">{pain.title}</h3>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">{pain.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PathsSection() {
  return (
    <section id="paths" className="grid scroll-mt-20 border-b border-[#0d0d0d] bg-[#f7f5ef] text-[#0d0d0d] md:mr-[var(--nosotros-rail)] lg:grid-cols-[var(--nosotros-side)_1fr]">
      <aside className="hidden border-r border-[#0d0d0d] bg-[#f7f5ef] p-5 lg:block">
        <Link href="/" className="sticky top-0 flex h-16 items-center">
          <Image
            src="/brand/cb_logo-main-black.png"
            alt="Cobalto Blue"
            width={220}
            height={64}
            className="h-auto w-full max-w-[220px] object-contain"
          />
        </Link>
      </aside>

      <div>
        <div className="border-b border-[#0d0d0d] bg-[#1F00FF] px-5 py-12 text-white sm:px-8 lg:px-12">
          <h2 className="max-w-5xl text-4xl font-bold leading-none md:text-7xl">Ofertas de entrada</h2>
          <p className="mt-6 max-w-2xl text-lg font-medium text-white/80 md:text-xl">
            Diseñamos tres rutas de ejecución basadas en el nivel de madurez de tu operación y los objetivos de negocio.
          </p>
        </div>
        <div className="grid md:grid-cols-3">
          {paths.map((path) => (
            <article key={path.title} className="group border-b border-r border-[#0d0d0d] p-5 transition-colors hover:bg-white sm:min-h-[360px] sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#1F00FF]">{path.weeks}</p>
                <div className="text-neutral-300 transition-colors group-hover:text-[#1F00FF]">{path.icon}</div>
              </div>
              <h3 className="mt-10 text-4xl font-bold leading-none">{path.title}</h3>
              <p className="mt-6 text-lg leading-relaxed text-neutral-600">{path.desc}</p>
            </article>
          ))}
        </div>
        <div className="bg-white p-5 sm:p-8 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">Especialidades</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {specialties.map((specialty) => (
              <span key={specialty} className="border border-[#0d0d0d] px-4 py-2 text-sm font-bold uppercase">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkCarouselSection() {
  const carouselRef = useRef<HTMLElement>(null)
  const hoverSpeed = useMotionValue(0)
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ['start start', 'end end']
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  const hoverRotate = useMotionValue(0)
  const combinedRotate = useTransform([rotate, hoverRotate], ([scrollRotate, pointerRotate]) => Number(scrollRotate) + Number(pointerRotate))
  const count = carouselProjects.length

  useAnimationFrame((_, delta) => {
    const speed = hoverSpeed.get()
    if (speed === 0) return
    hoverRotate.set(hoverRotate.get() + speed * delta * 0.04)
  })

  return (
    <section
      ref={carouselRef}
      id="work-carousel"
      className="relative h-[420vh] scroll-mt-20 overflow-clip bg-[#0d0d0d] text-white md:mr-[var(--nosotros-rail)]"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const pointerX = event.clientX - bounds.left
        const centered = (pointerX / bounds.width - 0.5) * 2
        const deadZone = 0.08

        if (Math.abs(centered) < deadZone) {
          hoverSpeed.set(0)
          return
        }

        hoverSpeed.set(-Math.sign(centered) * Math.min(1, Math.abs(centered)))
      }}
      onMouseLeave={() => hoverSpeed.set(0)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-x-0 top-[14vh] z-10 px-5 sm:px-8 lg:px-12">
          <Image
            src="/brand/logo-main-fullwhite.png"
            alt="Cobalto Blue"
            width={150}
            height={44}
            className="mb-7 h-auto w-[clamp(110px,11vw,150px)] object-contain"
            aria-hidden="true"
          />
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/60">Work</p>
          <h2 className="mt-3 max-w-5xl text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.86]">
            Nuestro
            <br />
            trabajo
          </h2>
        </div>

        <motion.div
          className="absolute left-1/2 top-[62%] h-[calc(var(--carousel-radius)*2)] w-[calc(var(--carousel-radius)*2)] -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate: combinedRotate,
            '--carousel-radius': 'clamp(210px, 32vw, 430px)'
          } as MotionStyle & Record<'--carousel-radius', string>}
        >
          {carouselProjects.map((project, index) => {
            const angle = (index / count) * 360

            return (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group absolute left-1/2 top-1/2 block w-[clamp(120px,13vw,210px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-white/20 bg-white text-[#0d0d0d] shadow-2xl"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--carousel-radius) * -1))`
                }}
              >
                <div className="relative aspect-[4/6] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized={project.image.endsWith('.gif')}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-[#0d0d0d] bg-white p-4">
                  <h3 className="text-xl font-bold leading-none">{project.title}</h3>
                  <p className="mt-2 text-xs font-bold uppercase text-[#1F00FF]">{project.desc}</p>
                </div>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function HomeFooter() {
  return (
    <footer id="contacto" className="grid scroll-mt-20 border-t border-[#0d0d0d] bg-[#0d0d0d] px-5 pb-28 pt-10 text-white sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-12 lg:py-8">
      <div>
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={192}
          height={56}
          className="mb-7 h-auto w-48 lg:hidden"
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
        <Image
          src="/brand/logo-main-fullwhite.png"
          alt="Cobalto Blue"
          width={176}
          height={52}
          className="h-auto w-44"
        />
      </div>
    </footer>
  )
}

export default function Page() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0vh', '-42vh'])
  const logoY = useTransform(scrollYProgress, [0, 0.22, 0.34], ['0vh', '0vh', '-34vh'])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.24, 0.34], [1, 1, 0])
  const statementTwoY = useTransform(scrollYProgress, [0.18, 0.34, 0.52, 0.66], ['34vh', '0vh', '0vh', '-34vh'])
  const statementTwoOpacity = useTransform(scrollYProgress, [0.18, 0.34, 0.52, 0.66], [0, 1, 1, 0])
  const statementThreeY = useTransform(scrollYProgress, [0.52, 0.72, 1], ['34vh', '0vh', '0vh'])
  const statementThreeOpacity = useTransform(scrollYProgress, [0.52, 0.72, 1], [0, 1, 1])

  return (
    <main
      className="min-h-screen bg-[#05050a] text-white"
      style={{
        '--nosotros-rail': 'clamp(18px, 2vw, 32px)',
        '--nosotros-side': 'clamp(260px, 22.5vw, 420px)'
      } as CSSProperties}
    >
      <div className="relative z-20 flex h-14 w-full items-center justify-center bg-black px-5 text-center font-['PPRightGroteskMono',system-ui,sans-serif] text-sm font-bold uppercase tracking-[0.08em] text-white md:h-16 md:text-base">
        Construyamos algo juntos
      </div>

      <HomeFloatingMenu targetRef={contentRef} variant="mobile" />

      <section ref={heroRef} className="relative h-[340vh] overflow-clip bg-[#080019]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#080019]">
          <motion.div
            className="absolute inset-x-0 top-[-54vh] h-[220vh] bg-[linear-gradient(180deg,#a9c8ff_0%,#5d91ff_18%,#1f00ff_43%,#16008f_70%,#080019_100%)]"
            style={{ y: backgroundY }}
          />
          <div className="relative flex h-full items-center justify-center px-6 text-center">
            <motion.div
              className="absolute flex w-full justify-center"
              style={{ y: logoY, opacity: logoOpacity }}
            >
              <Image
                src={statements[0].src}
                alt={statements[0].alt}
                width={260}
                height={76}
                priority
                className="h-auto w-[clamp(340px,48vw,720px)] object-contain"
              />
            </motion.div>

            <motion.h1
              className="absolute mx-auto max-w-[720px] text-[clamp(2.4rem,6.5vw,6.5rem)] font-bold leading-[0.88] tracking-normal text-white"
              style={{ y: statementTwoY, opacity: statementTwoOpacity }}
            >
              {statements[1].text}
            </motion.h1>

            <motion.h1
              className="absolute mx-auto max-w-[720px] text-[clamp(2.4rem,6.5vw,6.5rem)] font-bold leading-[0.88] tracking-normal text-white"
              style={{ y: statementThreeY, opacity: statementThreeOpacity }}
            >
              {statements[2].text}
            </motion.h1>
          </div>
        </div>
      </section>

      <div ref={contentRef} className="relative">
        <div className="absolute bottom-0 right-0 top-0 hidden w-[var(--nosotros-rail)] md:block">
          <ScrollPositionRail targetRef={contentRef} />
        </div>
        <div className="absolute bottom-0 right-[var(--nosotros-rail)] top-0 hidden w-16 md:block">
          <HomeFloatingMenu targetRef={contentRef} />
        </div>

        <div className="relative">
          <HomeSectionLogo />

          <section id="gif-section" className="relative min-h-screen scroll-mt-20 overflow-hidden bg-[#0d0d0d] text-white md:mr-[var(--nosotros-rail)]">
            <Image
              src="/projects/project06.gif"
              alt="Proyecto digital de Cobalto Blue en movimiento"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
            <div className="relative z-10 grid min-h-screen content-end px-5 pb-16 pt-32 sm:px-8 md:pb-24 lg:grid-cols-[var(--nosotros-side)_1fr] lg:px-12 lg:pt-40">
              <div className="hidden lg:block" aria-hidden="true" />
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-white/75">
                  Home / Work
                </p>
                <h2 className="max-w-5xl text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.86] tracking-normal">
                  Sistemas que se sienten vivos.
                </h2>
                <p className="mt-6 max-w-2xl text-xl font-bold leading-tight text-white/82 md:text-3xl">
                  Diseño, producto y tecnología trabajando en una sola dirección.
                </p>
              </div>
            </div>
          </section>

          <PainPointsSection />
        </div>

        <ServicesMarquee />

        <PathsSection />
      </div>

      <div className="relative z-50 bg-[#0d0d0d]">
        <WorkCarouselSection />
      </div>

      <HomeFooter />
    </main>
  )
}
