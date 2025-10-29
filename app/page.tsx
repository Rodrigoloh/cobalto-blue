import FooterClean from '@/components/FooterClean'
import RecentProjects from '@/components/RecentProjects'

export default function Page(){
  return (
    <main className="wrapper">
      {/* 1.a Hero con fondo hero.png y logo centrado */}
      <section className="section relative h-screen">
        <div className="absolute inset-0 -z-10 bg-center bg-cover" style={{ backgroundImage: 'url(/hero/hero.jpg)' }} />
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <div className="h-full w-full flex items-center justify-center">
          <img src="/brand/cb_logo-main-fullwhite.png" alt="cobalto.blue" className="w-[min(80vw,720px)] h-auto" />
        </div>
      </section>

      {/* 1.b Sección blanca con el texto */}
      <section className="bg-white text-black">
        <div className="mx-auto max-w-3xl md:max-w-5xl px-6 py-20 md:py-28 text-center">
          <p className="text-xl md:text-2xl leading-relaxed">Cobalto Blue existe para dar forma a las ideas que merecen ser vistas.</p>
          <p className="mt-6 text-xl md:text-2xl leading-relaxed">Construimos marcas que comunican con claridad y se sienten vivas.</p>
        </div>
      </section>

      {/* 1.c Mini galería de 4 proyectos + banner negro con CTA */}
      <RecentProjects />

      {/* 1.d Footer negro */}
      <FooterClean />
    </main>
  )
}
