import HeroClean from '@/components/HeroClean'
import SectionNosotros from '@/components/SectionNosotros'
import ProjectsGrid from '@/components/ProjectsGrid'
import FooterClean from '@/components/FooterClean'

export default function Page(){
  return (
    <div className="wrapper">
      <HeroClean />
      <SectionNosotros />
      <ProjectsGrid />
      <FooterClean />
    </div>
  )
}
