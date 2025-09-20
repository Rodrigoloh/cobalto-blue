'use client'

export default function SectionClientes(){
  const placeholders = Array.from({length: 12}).map((_,i)=>`Cliente ${i+1}`)
  return (
    <section id="clientes" className="section flex items-center">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <h2 className="font-neueMachina font-bold text-5xl mb-10">Clientes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {placeholders.map((p)=> (
            <div key={p} className="h-24 rounded-xl border border-white/15 bg-white/5 grid place-items-center text-white/70">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}