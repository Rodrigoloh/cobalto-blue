'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * FloatingIcons (staged)
 * - Contenedor alto (300vh) + hijo sticky top-0: esto mantiene los íconos "anclados"
 *   mientras el progreso de scroll de ESTA sección avanza de 0 → 1.
 * - Etapas:
 *   STAGE 1 (0.00 → 0.20): cb_circles baja desde ~5vh hasta ~90vh.
 *   STAGE 2 (0.20 → 0.70): cb_circles se queda en ~90vh (pausa).
 *   STAGE 3 (0.70 → 1.00): cb_circles sube un poco (a ~40vh) junto con todo lo demás.
 *   El icono cb_icon acompaña con su propia curva (sube más y con ajuste horizontal suave).
 *
 * Importante:
 * - NO usar contenedor fixed aquí. La sección debe participar en el flujo del documento para
 *   que useScroll calcule bien el progreso.
 * - Si usas scroll-snap global, añade la clase .no-snap a esta sección para evitar saltos.
 */

export default function FloatingIcons() {
  // Sección "alta" para producir progreso de scroll local
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'], // cuando el bottom de la sección toca el top del viewport => 1
  })

  // === CB_CIRCLES: Baja → Pausa → Sube ===
  const circlesY = useTransform(
    scrollYProgress,
    [0.0, 0.20, 0.70, 1.0],
    ['5vh', '90vh', '90vh', '40vh'] // Arriba → fondo → PAUSA → sube un poco
  )
  const circlesOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])

  // === CB_ICON: Pausa y sube más en Stage 3 ===
  const iconTop = useTransform(
    scrollYProgress,
    [0.0, 0.25, 0.70, 1.0],
    ['85vh', '10vh', '10vh', '-20vh'] // Parte baja → arriba → PAUSA → sube más (sale del viewport)
  )
  const iconLeft = useTransform(
    scrollYProgress,
    [0.0, 0.5, 1.0],
    ['85vw', '90vw', '88vw'] // Ajuste horizontal sutil
  )

  return (
    <section
      ref={sectionRef}
      id="floating-icons-stage"
      className="section no-snap relative"
      style={{ height: '300vh' }} // 3 pantallas de alto; ajusta si quieres más/menos tiempo
      aria-label="Floating icons staged"
    >
      {/* El viewport "anclado" donde viven los íconos */}
      <div className="sticky top-0 h-screen pointer-events-none z-40">
        {/* CB_CIRCLES (centrado horizontalmente) */}
        <motion.div
          style={{ y: circlesY, opacity: circlesOpacity }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <img
            src="/brand/cb_circles.png"
            alt="cobalto circles"
            className="w-40 h-14 object-contain"
          />
        </motion.div>

        {/* CB_ICON (movimiento vertical+ajuste horizontal) */}
        <motion.div
          style={{ top: iconTop, left: iconLeft }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src="/brand/cb_icon.png"
            alt="cobalto icon"
            className="w-20 h-20 object-contain"
          />
        </motion.div>
      </div>
    </section>
  )
}