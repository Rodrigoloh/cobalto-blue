import HeroClean from '@/components/HeroClean'
import SectionNosotros from '@/components/SectionNosotros'
import SectionContacto from '@/components/SectionContacto'
import FooterClean from '@/components/FooterClean'

export default function Page(){
  return (
    <div className="wrapper">
      <HeroClean />
      <SectionNosotros />
      <SectionContacto />
      <FooterClean />
    </div>
  )
}
