import FooterClean from '@/components/FooterClean'
import SectionContacto from '@/components/SectionContacto'

export default function ContactPage(){
  return (
    <main className="pt-24 relative">
      {/* Fondo cobalto detrás de todo */}
      <div className="fixed inset-0 -z-10 bg-[#1F00FF]" aria-hidden />
      {/* Sección de contacto en azul, como en Nosotros */}
      <SectionContacto />
      <FooterClean />
    </main>
  )
}
