'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBG() {
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])

  return (
    <div className="relative h-[120vh]">
      <motion.div style={{ y: y2 }} className="absolute inset-0 -z-20 bg-gradient-to-b from-cobalt-900 via-slate-900 to-cobalt-800 opacity-80" />
      <motion.div style={{ y: y1 }} className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(13,139,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_top_right,rgba(0,111,230,0.45),transparent_50%)]" />
    </div>
  )
}