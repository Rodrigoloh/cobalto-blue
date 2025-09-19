'use client'
import { motion } from 'framer-motion'
import ParallaxBG from '@/components/ParallaxBG'
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="pt-24">
      <div className="relative">
        <ParallaxBG />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <motion.h1 initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            Diseño que se siente real. <span className="text-cobalt-300">Tecnología</span> que mueve el negocio.
          </motion.h1>
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="mt-5 max-w-2xl text-slate-300">
            Branding, experiencias y producto digital. Creamos nombres, sistemas visuales, activaciones medibles y MVPs que conectan con objetivos.
          </motion.p>
          <div className="mt-8 flex items-center gap-3">
            <Link href="/work" className="rounded-full bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2">Ver trabajo</Link>
            <Link href="/contacto" className="rounded-full bg-cobalt-300 hover:bg-cobalt-200 text-slate-900 px-5 py-2">Agenda una llamada</Link>
          </div>
        </div>
      </div>

      {/* What we do */}
      <div id="que-hacemos" className="mx-auto max-w-6xl px-6 pb-28 grid md:grid-cols-3 gap-6">
        {[{
          t:'Brand & Naming',
          b:'Identidad, tono y sistemas visuales con estrategia. Naming, arquitectura y guías.'
        },{
          t:'Experiencias & BTL',
          b:'Activaciones medibles: pop-ups, tiendas, eventos. Diseño y producción end-to-end.'
        },{
          t:'Producto Digital',
          b:'Sitios y apps. MVPs y diseño de interfaces con foco en negocio.'
        }].map((f)=> (
          <div key={f.t} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
            <h3 className="font-semibold text-lg">{f.t}</h3>
            <p className="mt-2 text-slate-300 text-sm">{f.b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}