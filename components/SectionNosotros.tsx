'use client'

export default function SectionNosotros(){
  return (
    <section id="nosotros" className="section no-snap relative min-h-[240vh]">
      {/* Contenido estático: sin fade ni animaciones; sube con el scroll */}
      <div className="mx-auto max-w-4xl px-6 pr-safe-right min-h-screen flex items-center">
        <div>
          <h2 className="font-neueMachina font-bold text-5xl mb-6">Nosotros</h2>
          <p className="font-circularStd text-lg leading-relaxed text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra, purus non malesuada
            bibendum, libero tortor luctus mi, in commodo arcu augue eu risus. Donec faucibus, nisl at
            fermentum posuere, leo enim fermentum tellus, vitae pulvinar est quam quis nisi. Integer
            faucibus elit sed erat gravida, a aliquet lorem cursus. Integer consequat maximus leo.
          </p>
        </div>
      </div>
    </section>
  )
}
