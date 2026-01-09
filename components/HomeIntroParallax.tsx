"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HomeIntroParallax() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const dotY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])
  const dotX = useTransform(scrollYProgress, [0, 1], ['0px', '-30px'])
  const dashY = useTransform(scrollYProgress, [0, 1], ['20px', '-40px'])
  const dashX = useTransform(scrollYProgress, [0, 1], ['0px', '30px'])

  return (
    <section ref={ref} id="intro" className="section bg-white text-black relative overflow-hidden flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-6 w-full flex flex-col items-center justify-center text-center">
        <motion.div style={{ y: dotY, x: dotX }} className="mb-6 md:mb-8">
          <div className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-cobaltBase" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
          Brands that speak clearly.
        </h2>

        <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
          Brands that <span className="text-cobaltBase">feel alive.</span>
        </h2>

        <motion.div style={{ y: dashY, x: dashX }} className="mt-12 md:mt-14 h-[3px] w-14 bg-black" />
      </div>
    </section>
  )
}
