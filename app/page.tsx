import BackgroundGrad from '@/components/BackgroundGrad'
import Hero from '@/components/Hero'
import SectionNosotros from '@/components/SectionNosotros'
import SectionServicios from '@/components/SectionServicios'
import WorkCarousel from '@/components/WorkCarousel'
import SectionClientes from '@/components/SectionClientes'
import SectionContacto from '@/components/SectionContacto'

export default function Page(){
  return (
    <div className="wrapper">
      <BackgroundGrad />
      <Hero />
      <SectionNosotros />
      <SectionServicios />
      <WorkCarousel />
      <SectionClientes />
      <SectionContacto />
    </div>
  )
}
