'use client'

export default function SectionClientes(){
  const placeholders = Array.from({length: 12}).map((_,i)=>`Cliente ${i+1}`)
  return (
    <section id="clientes" className="section flex items-center bg-white">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">Clientes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {placeholders.map((p)=> (
            <div key={p} className="h-24 rounded-xl border border-neutral-200 bg-white grid place-items-center text-neutral-600">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
