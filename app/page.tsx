import HeroClean from '@/components/HeroClean'
import ProjectsGrid from '@/components/ProjectsGrid'
import SectionNosotros from '@/components/SectionNosotros'
import SectionServicios from '@/components/SectionServicios'
import SectionClientes from '@/components/SectionClientes'
import FooterClean from '@/components/FooterClean'

export default function Page(){
  return (
    <div className="wrapper">
      <HeroClean />
      <ProjectsGrid />
      <SectionServicios />
      <SectionNosotros />
      <SectionClientes />
      <FooterClean />
    </div>
  )
}
