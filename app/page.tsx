import FooterClean from '@/components/FooterClean'
import RecentProjects from '@/components/RecentProjects'
import HeroParallax from '@/components/HeroParallax'
import HomeIntroParallax from '@/components/HomeIntroParallax'

export default function Page(){
  return (
    <main className="wrapper">
      {/* 1.a Hero con parallax: el logo se desplaza más lento que el fondo */}
      <HeroParallax />

      {/* 1.b Sección con layers y parallax */}
      <HomeIntroParallax />

      {/* 1.c Mini galería de 4 proyectos + banner negro con CTA */}
      <RecentProjects />

      {/* 1.d Footer negro */}
      <FooterClean />
    </main>
  )
}
