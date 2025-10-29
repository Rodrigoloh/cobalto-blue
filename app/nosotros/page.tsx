import SectionNosotros from '@/components/SectionNosotros'
import FooterClean from '@/components/FooterClean'

export default function NosotrosPage(){
  return (
    <main className="pt-24">
      {/* Reutilizamos la sección original tal como estaba */}
      <SectionNosotros />
      <FooterClean />
    </main>
  )
}
