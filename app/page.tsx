import FooterClean from '@/components/FooterClean'
import RecentProjects from '@/components/RecentProjects'

export default function Page(){
  return (
    <main className="wrapper">
      {/* 1.a Hero con fondo hero.png y logo centrado */}
      <section id="hero" className="section relative h-screen">
        <div className="absolute inset-0 -z-10 bg-center bg-cover" style={{ backgroundImage: 'url(/hero/hero.jpg)' }} />
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <div className="h-full w-full flex items-center justify-center">
          <img src="/brand/cb_logo-main-fullwhite.png" alt="cobalto.blue" className="w-[min(80vw,720px)] h-auto" />
        </div>
        {/* Botón para pasar a la siguiente sección */}
        <a
          href="#intro"
          aria-label="Siguiente sección"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="rounded-full bg-black/60 px-4 py-2 text-sm">Siguiente</div>
          <svg className="mx-auto mt-2 animate-float-y" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

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
