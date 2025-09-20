'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useStageMetrics } from '@/hooks/useStageMetrics'

const defaultInput = [0, 1, 2, 3, 4, 5]
const defaultOutput = [0, 0, 0, 0, 0, 0]

export default function FloatingIcons() {
  const { scrollY } = useScroll()
  const metrics = useStageMetrics()

  // Comportamiento solicitado:
  // - En Hero: círculo fijo cerca de la parte superior.
  // - En Nosotros: se mueve hacia arriba junto con el contenido (como si fuera estático en el flujo).
  // - Al comenzar Servicios: ya va fuera del viewport por arriba.
  const circlesInput = metrics.ready
    ? [metrics.heroTop, metrics.heroBottom, metrics.serviciosTop]
    : [0, 1, 2]

  const topY = metrics.ready ? metrics.windowHeight * 0.12 : 0
  const endY = metrics.ready ? topY - (metrics.serviciosTop - metrics.heroBottom) : 0
  const circlesOutput = metrics.ready ? [topY, topY, endY] : [0, 0, 0]


  // cb_icon: fijo en la parte inferior derecha hasta que Contacto lo
  // lleve a la esquina superior derecha, con movimiento sólo vertical.
  const iconInput = metrics.ready
    ? [metrics.heroTop, metrics.contactoTop, metrics.contactoRelease]
    : defaultInput
  const iconBottomY = metrics.ready ? metrics.windowHeight * 0.88 : 0
  const iconTopY = metrics.ready ? metrics.windowHeight * 0.08 : 0
  const iconOutput = metrics.ready ? [iconBottomY, iconBottomY, iconTopY] : defaultOutput

  const circlesY = useTransform(scrollY, circlesInput, circlesOutput)
  const iconY = useTransform(scrollY, iconInput, iconOutput)

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{ visibility: metrics.ready ? 'visible' : 'hidden' }}
    >
      {/* CB_CIRCLES */}
      <motion.div
        style={{
          y: circlesY,
          x: '50vw',
          translateX: '-50%'
        }}
        className="absolute"
      >
        <img
          src="/brand/cb_circles.png"
          alt="cobalto circles"
          className="w-40 h-14 object-contain"
        />
      </motion.div>

      {/* CB_ICON */}
      <motion.div
        style={{
          y: iconY,
          right: '3vw'
        }}
        className="absolute"
      >
        <img
          src="/brand/cb_icon.png"
          alt="cobalto icon"
          className="w-20 h-20 object-contain"
        />
      </motion.div>
    </div>
  )
}
