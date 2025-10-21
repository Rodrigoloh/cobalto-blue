import HeroClean from '@/components/HeroClean'
import SectionNosotros from '@/components/SectionNosotros'
import ProjectsGrid from '@/components/ProjectsGrid'
import SectionClientes from '@/components/SectionClientes'
import FooterClean from '@/components/FooterClean'

export default function Page(){
  return (
    <div className="wrapper">
      <HeroClean />
      <SectionNosotros />
      <ProjectsGrid />
      <SectionClientes />
      <FooterClean />
    </div>
  )
}
