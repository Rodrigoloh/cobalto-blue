'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type ActiveLayer = -1 | 0 | 1

const gradients = [
  {
    id: 'gradient-1',
    className: 'bg-gradient-to-br from-[#1F00FF] via-[#0076ff] to-[#3a00ff]'
  },
  {
    id: 'gradient-2',
    className:
      'bg-[radial-gradient(ellipse_at_top_left,#1F00FF_0%,#0076ff_30%,#3a00ff_60%,#1F00FF_100%)]'
  }
]

export default function BackgroundGrad() {
  const [activeGradient, setActiveGradient] = useState<ActiveLayer>(-1)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionNodes = Array.from(document.querySelectorAll<HTMLElement>('.section'))
    if (!sectionNodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return

        const index = sectionNodes.indexOf(visible[0].target as HTMLElement)
        if (index === -1) return

        const nextGradient: ActiveLayer =
          index === 0 ? -1 : ((index - 1) % gradients.length) as ActiveLayer

        setActiveGradient((prev) => (prev === nextGradient ? prev : nextGradient))
      },
      {
        threshold: [0.15, 0.3, 0.6, 0.85],
        rootMargin: '-25% 0px -25% 0px'
      }
    )

    sectionNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return (
    <div aria-hidden className="fixed inset-0 -z-50 pointer-events-none">
      <motion.div
        key="hero-solid"
        className="absolute inset-0 bg-[#1F00FF]"
        animate={{ opacity: activeGradient === -1 ? 1 : 0 }}
        initial={activeGradient === -1 ? 1 : 0}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      {gradients.map((gradient, index) => (
        <motion.div
          key={gradient.id}
          className={`absolute inset-0 ${gradient.className}`}
          animate={{ opacity: activeGradient === index ? 1 : 0 }}
          initial={activeGradient === index ? 1 : 0}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
