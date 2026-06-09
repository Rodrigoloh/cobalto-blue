'use client'

import { useMemo, useState } from 'react'

type Phase = {
  title: string
  desc: string
  involvement: number
}

type Track = {
  title: string
  color: string
  soft: string
  phases: Phase[]
}

const TRACKS: Track[] = [
  {
    title: 'SaaS',
    color: '#ccff3f',
    soft: 'rgba(204, 255, 63, 0.08)',
    phases: [
      { title: 'Discovery & strategy', desc: 'Definimos el problema, usuarios, roles, datos, reglas de negocio y el alcance real del MVP.', involvement: 38 },
      { title: 'Architecture & UX', desc: 'Convertimos el producto en modulos, flujos, permisos, pantallas clave e integraciones necesarias.', involvement: 72 },
      { title: 'Product design', desc: 'Disenamos una interfaz clara para usuarios reales, con estados, componentes y experiencia repetible.', involvement: 64 },
      { title: 'Development', desc: 'Construimos front-end, back-end, paneles, autenticacion, base de datos e integraciones.', involvement: 46 },
      { title: 'QA & data', desc: 'Probamos reglas, estados, permisos, flujos criticos y datos reales antes de publicar.', involvement: 54 },
      { title: 'Launch', desc: 'Publicamos, medimos, corregimos y dejamos una ruta de crecimiento para la siguiente version.', involvement: 68 }
    ]
  },
  {
    title: 'Web',
    color: '#1F00FF',
    soft: 'rgba(31, 0, 255, 0.12)',
    phases: [
      { title: 'Content strategy', desc: 'Ordenamos propuesta, servicios, casos, mensajes clave y contenido legible para personas, buscadores y AI.', involvement: 42 },
      { title: 'Information architecture', desc: 'Definimos navegacion, jerarquia, secciones, landings y estructura tecnica del sitio.', involvement: 70 },
      { title: 'Interface system', desc: 'Creamos una direccion visual sobria, componentes reutilizables y una experiencia responsive.', involvement: 58 },
      { title: 'Development', desc: 'Construimos con performance, metadata, analitica, accesibilidad y base lista para crecer.', involvement: 50 },
      { title: 'Optimization', desc: 'Medimos velocidad, conversion, SEO y comportamiento para mejorar el sitio despues del lanzamiento.', involvement: 74 }
    ]
  },
  {
    title: 'Systems',
    color: '#ff4a25',
    soft: 'rgba(255, 74, 37, 0.1)',
    phases: [
      { title: 'Operational audit', desc: 'Analizamos tareas manuales, herramientas actuales, responsables, entradas, salidas y puntos de friccion.', involvement: 52 },
      { title: 'Workflow design', desc: 'Traducimos la operacion en estados, reglas, permisos, vistas, automatizaciones y alertas.', involvement: 78 },
      { title: 'Interface design', desc: 'Disenamos pantallas densas pero claras para equipos que usaran el sistema todos los dias.', involvement: 62 },
      { title: 'Integration', desc: 'Conectamos APIs, CRMs, pagos, formularios, reportes o bases de datos existentes.', involvement: 44 },
      { title: 'Security & roles', desc: 'Definimos accesos, permisos, trazabilidad y controles para que cada usuario vea lo correcto.', involvement: 58 },
      { title: 'Training & iteration', desc: 'Acompanamos adopcion, documentamos uso y ajustamos el sistema con feedback del equipo.', involvement: 66 }
    ]
  }
]

export default function NosotrosProcessLab() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [version, setVersion] = useState(0)
  const track = TRACKS[trackIndex]
  const phase = track.phases[phaseIndex]

  const path = useMemo(() => buildPath(track.phases.map((item) => item.involvement)), [track])

  const selectTrack = (index: number) => {
    if (index === trackIndex) return
    setTrackIndex(index)
    setPhaseIndex(0)
    setVersion((value) => value + 1)
  }

  return (
    <section
      id="process"
      className="min-h-[100svh] scroll-mt-24 border-b border-[#0d0d0d] bg-[#141414] text-white"
    >
      <div className="relative min-h-[100svh] overflow-hidden bg-[#151515] px-5 pb-8 pt-24 sm:px-8 lg:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '4px 4px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl py-12 md:py-20">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: track.color }}>
            Our process
          </p>
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-bold leading-[0.86]">
            How we build digital systems.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-2xl leading-tight text-white md:text-3xl">
            <p>
              Un proceso claro para convertir necesidades operativas en productos digitales que se pueden usar, medir y mejorar.
            </p>
            <p className="text-white/70">
              Selecciona un tipo de proyecto para explorar fases, nivel de participacion del cliente y decisiones clave.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-3 lg:justify-start">
          {TRACKS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => selectTrack(index)}
              className={`rounded-full border px-7 py-4 text-lg font-bold transition ${
                index === trackIndex
                  ? 'border-white bg-white text-[#111111]'
                  : 'border-white/75 text-white hover:bg-white hover:text-[#111111]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          key={`process-scene-${version}`}
          className="relative z-10 mt-10 hidden min-h-[620px] animate-process-scene grid-rows-[96px_1fr] overflow-hidden md:mt-12 lg:grid"
        >
          <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${track.phases.length}, minmax(0, 1fr))` }} aria-hidden="true">
            {track.phases.map((item, index) => (
              <div
                key={`${item.title}-highlight`}
                className="transition duration-200"
                style={{ backgroundColor: index === phaseIndex ? track.soft : 'transparent' }}
              />
            ))}
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${track.phases.length}, minmax(0, 1fr))` }}>
            {track.phases.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setPhaseIndex(index)}
                onFocus={() => setPhaseIndex(index)}
                onClick={() => setPhaseIndex(index)}
                className="relative flex items-start border-l border-white/10 px-4 py-5 text-left last:border-r md:px-8"
              >
                <span
                  className="relative z-10 text-xs font-bold uppercase tracking-[0.12em]"
                  style={{ color: index === phaseIndex ? track.color : '#ffffff' }}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${track.phases.length}, minmax(0, 1fr))` }} aria-hidden="true">
              {track.phases.map((item) => (
                <div key={item.title} className="border-l border-white/10 last:border-r" />
              ))}
            </div>

            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${track.phases.length}, minmax(0, 1fr))` }}>
              {track.phases.map((item, index) => (
                <button
                  key={`${item.title}-hit`}
                  type="button"
                  onMouseEnter={() => setPhaseIndex(index)}
                  onFocus={() => setPhaseIndex(index)}
                  onClick={() => setPhaseIndex(index)}
                  className="relative z-10 h-full border-l border-transparent text-left last:border-r"
                  aria-label={item.title}
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                </button>
              ))}
            </div>

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 440" preserveAspectRatio="none" aria-hidden="true">
              <path
                d={path}
                fill="none"
                stroke={track.color}
                strokeWidth="2.4"
                vectorEffect="non-scaling-stroke"
              />
              <rect className="process-line-mask" x="0" y="0" width="1200" height="440" fill="#151515">
                <animate attributeName="x" from="0" to="1200" dur="0.85s" begin="0.08s" fill="freeze" />
              </rect>
            </svg>
          </div>

          <div className="pointer-events-none absolute bottom-12 left-0 z-20 max-w-md pl-10 md:left-2 md:pl-14">
            <span className="absolute bottom-0 left-4 top-0 w-1 rounded-full md:left-6" style={{ backgroundColor: track.color }} aria-hidden="true" />
            <p className="text-xl font-bold leading-tight text-white md:text-2xl">{phase.desc}</p>
          </div>

          <div className="absolute bottom-12 right-4 z-20 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.14em] md:right-10">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: track.color }} aria-hidden="true" />
            <span>Client involvement</span>
          </div>
        </div>

        <div
          key={`process-mobile-${version}`}
          className="relative z-10 mt-8 grid animate-process-scene gap-3 lg:hidden"
        >
          {track.phases.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onMouseEnter={() => setPhaseIndex(index)}
              onFocus={() => setPhaseIndex(index)}
              onClick={() => setPhaseIndex(index)}
              className="border border-white/15 p-5 text-left transition"
              style={{ backgroundColor: index === phaseIndex ? track.soft : 'transparent' }}
            >
              <div className="flex items-start justify-between gap-4">
                <p
                  className="text-sm font-bold uppercase tracking-[0.12em]"
                  style={{ color: index === phaseIndex ? track.color : '#ffffff' }}
                >
                  {item.title}
                </p>
                <span className="text-sm font-bold text-white/35">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className={`mt-5 text-lg font-bold leading-tight ${index === phaseIndex ? 'text-white' : 'text-white/65'}`}>
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function phasePoint(index: number, total: number, involvement = 55) {
  const width = 1200
  const height = 440
  const x = total <= 1 ? width / 2 : (index / (total - 1)) * width
  const y = height - 54 - involvement * 3.35
  return { x, y }
}

function buildPath(values: number[]) {
  const points = values.map((value, index) => phasePoint(index, values.length, value))
  if (!points.length) return ''

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const previous = points[index - 1]
    const control = (point.x - previous.x) * 0.48
    return `${path} C ${previous.x + control} ${previous.y}, ${point.x - control} ${point.y}, ${point.x} ${point.y}`
  }, '')
}
