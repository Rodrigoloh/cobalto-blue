import FooterClean from '@/components/FooterClean'
import RecentProjects from '@/components/RecentProjects'
import HeroParallax from '@/components/HeroParallax'

export default function Page(){
  return (
    <main className="wrapper">
      {/* 1.a Hero con parallax: el logo se desplaza más lento que el fondo */}
      <HeroParallax />

      {/* 1.b Sección blanca con el texto */}
      <section id="intro" className="bg-white text-black">
        <div className="mx-auto max-w-3xl md:max-w-5xl px-6 py-28 md:py-40 min-h-[60vh] md:min-h-[70vh] flex items-center justify-center text-center">
          <div>
            <p className="text-xl md:text-2xl leading-relaxed">Cobalto Blue existe para dar forma a las ideas que merecen ser vistas.</p>
            <p className="mt-6 text-xl md:text-2xl leading-relaxed">Construimos marcas que comunican con claridad y se sienten vivas.</p>
          </div>
        </div>
      </section>

      {/* 1.c Mini galería de 4 proyectos + banner negro con CTA */}
      <RecentProjects />

      {/* 1.d Footer negro */}
      <FooterClean />
    </main>
  )
}
