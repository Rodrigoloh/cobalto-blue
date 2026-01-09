"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HomeIntroParallax() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const dotY = useTransform(scrollYProgress, [0, 1], ['30px', '-70px'])
  const dotX = useTransform(scrollYProgress, [0, 1], ['0px', '-30px'])
  const line1Y = useTransform(scrollYProgress, [0, 1], ['10px', '-50px'])
  const line1X = useTransform(scrollYProgress, [0, 1], ['0px', '20px'])
  const line2Y = useTransform(scrollYProgress, [0, 1], ['40px', '-90px'])
  const line2X = useTransform(scrollYProgress, [0, 1], ['0px', '-10px'])
  const dashY = useTransform(scrollYProgress, [0, 1], ['60px', '-110px'])
  const dashX = useTransform(scrollYProgress, [0, 1], ['0px', '30px'])

  return (
    <section ref={ref} id="intro" className="section bg-white text-black relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-40 min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.div style={{ y: dotY, x: dotX }} className="mb-6 md:mb-8">
          <div className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-cobaltBase" />
        </motion.div>

        <motion.h2
          style={{ y: line1Y, x: line1X }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black"
        >
          Brands that speak clearly.
        </motion.h2>

        <motion.h2
          style={{ y: line2Y, x: line2X }}
          className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-black"
        >
          Brands that <span className="text-cobaltBase">feel alive.</span>
        </motion.h2>

        <motion.div style={{ y: dashY, x: dashX }} className="mt-8 md:mt-10 h-[3px] w-14 bg-black" />
      </div>
    </section>
  )
}
