'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * StageSequence
 * Escena scroll-driven con 3 etapas en un mismo "stage" sticky.
 *
 * SCROLL RANGES (porcentaje de progreso de la sección):
 *  - 0.00 → 0.33 : STAGE 1
 *  - 0.33 → 0.66 : STAGE 2
 *  - 0.66 → 1.00 : STAGE 3
 *
 * Reemplaza paths de imágenes si lo necesitas:
 *  - /brand/cb_circles.png   -> tus 3 círculos (Logo2)
 *  - /brand/cb_logo-main-white.png -> tu logo principal en blanco
 */

export default function StageSequence() {
  // Sección alta (300vh) y hijo sticky para "pinning"
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'], // cuando el bottom de la sección toque el top del viewport, progress = 1
  })

  // ====== STAGE 1 (0 → 0.33) ======
  // Círculos bajan: de Y -25% (arriba) a Y +45% (abajo)
  const circlesY = useTransform(scrollYProgress, [0.0, 0.33], ['-25%', '45%'])

  // Logo + tagline suben y desvanecen: de Y 0% a Y -20% y opacidad 1 → 0
  const heroY = useTransform(scrollYProgress, [0.0, 0.33], ['0%', '-20%'])
  const heroOpacity = useTransform(scrollYProgress, [0.0, 0.25, 0.33], [1, 0.25, 0])

  // ====== STAGE 2 (0.33 → 0.66) ======
  // Texto "Nosotros" entra desde abajo: de Y 60% → 0%, opacidad 0 → 1
  const aboutY = useTransform(scrollYProgress, [0.33, 0.50, 0.66], ['60%', '10%', '0%'])
  const aboutOpacity = useTransform(scrollYProgress, [0.33, 0.50, 0.66], [0, 0.6, 1])

  // ====== STAGE 3 (0.66 → 1.0) ======
  // Plasta blanca sube a cubrir todo: de Y 100% → 0%
  const stage3Y = useTransform(scrollYProgress, [0.66, 1.0], ['100%', '0%'])
  const stage3Opacity = useTransform(scrollYProgress, [0.66, 0.8, 1.0], [0, 0.6, 1])

  return (
    <section
      ref={sectionRef}
      id="stage-sequence"
      className="relative no-snap"
      style={{ height: '300vh' }} // tres pantallas de alto
    >
      {/* Viewport "anclado" para las animaciones */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#1F00FF] text-white">
        {/* ===== STAGE 1 ===== */}
        {/* Logo + tagline: suben y hacen fade-out para no cruzarse con los círculos */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        >
          <Image
            src="/brand/cb_logo-main-white.png"
            alt="cobalto.blue"
            width={560}
            height={168}
            priority
          />
          <p className="mt-6 text-lg md:text-xl tracking-wide text-white/90">
            ARE WE HUMANS OR ARE WE ....?
          </p>
        </motion.div>

        {/* Círculos bajando (Logo2) */}
        <motion.div
          style={{ y: circlesY }}
          className="absolute left-1/2 -translate-x-1/2 top-8 md:top-10 z-20"
        >
          <Image
            src="/brand/cb_circles.png"
            alt="cb circles"
            width={88}
            height={88}
            priority
          />
        </motion.div>

        {/* ===== STAGE 2 ===== */}
        {/* Texto "Nosotros" sube desde la parte inferior al centro */}
        <motion.div
          style={{ y: aboutY, opacity: aboutOpacity }}
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Nosotros</h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra,
              purus non malesuada bibendum, libero tortor luctus mi, in commodo arcu augue eu risus.
              Donec faucibus nisl at fermentum posuere. Integer consequat maximus leo.
            </p>
          </div>
        </motion.div>

        {/* ===== STAGE 3 ===== */}
        {/* Plasta blanca con texto que desplaza todo lo anterior */}
        <motion.div
          style={{ y: stage3Y, opacity: stage3Opacity }}
          className="absolute inset-0 bg-white text-black z-40"
        >
          <div className="h-full flex items-center justify-center px-6 text-center">
            <div className="mx-auto max-w-4xl">
              <h3 className="text-5xl md:text-6xl font-bold mb-4">Siguiente etapa</h3>
              <p className="text-lg md:text-xl text-black/80">
                Este bloque blanco entra desde abajo y cubre todo el escenario (stage3).
                Aquí puedes poner contenido de "Servicios", "Work" o cualquier sección que venga después.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
