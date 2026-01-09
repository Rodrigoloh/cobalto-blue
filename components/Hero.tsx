'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero(){
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  
  // Logo principal y texto desaparecen cuando cb_circles baja (0-0.25)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section ref={ref} id="inicio" className="section relative flex items-center justify-center">
      <div className="text-center px-6 pr-safe-right">
        {/* Logo principal que desaparece al hacer scroll */}
        <motion.div 
          initial={{opacity:0,y:10}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.6}}
          style={{ opacity: logoOpacity, scale: logoScale }}
        >
          <Image src="/brand/cb_logo-main-white.png" alt="cobalto.blue" width={600} height={180} priority className="mx-auto" />
        </motion.div>
        <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.7, delay:0.1}}
          style={{ opacity: textOpacity }}
          className="mt-8 text-lg md:text-xl tracking-wide">
          ARE WE HUMANS OR ARE WE ....?
        </motion.p>
      </div>
    </section>
  )
}
