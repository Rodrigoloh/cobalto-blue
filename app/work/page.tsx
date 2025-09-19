export default function WorkPage(){
  const items = [
    { tag: 'Retail', title: 'Tienda insignia / OXXO x Pedigree', note: 'Concepto y plan de activación' },
    { tag: 'SaaS', title: 'CarSpotta', note: 'PWA de car spotting gamificado' },
    { tag: 'Wellness', title: 'GLIM Med Spa', note: 'Estrategia, sitio y sistema de reservas' }
  ]
  return (
    <section className="pt-28 mx-auto max-w-6xl px-6 pb-24">
      <h1 className="text-3xl font-semibold">Trabajo seleccionado</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((w)=> (
          <div key={w.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="text-xs uppercase tracking-wide text-cobalt-300">{w.tag}</span>
            <h3 className="mt-2 font-semibold">{w.title}</h3>
            <p className="text-sm text-slate-300">{w.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}