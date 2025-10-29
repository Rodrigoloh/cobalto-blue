type Project = { id: number; title: string; desc: string; image: string; slug: string }

const projects: Project[] = Array.from({ length: 4 }, (_, i) => {
  const n = i + 1
  const num = String(n).padStart(2, '0')
  return {
    id: n,
    slug: `proyecto-${num}`,
    title: `Proyecto ${num}`,
    desc: 'Pequeña descripción del proyecto.',
    image: `/projects/project${num}.png`,
  }
})

export default function RecentProjects() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h3 className="text-2xl md:text-3xl font-semibold">Nuestros más recientes proyectos</h3>
      </div>
      <div className="grid grid-cols-2 portrait-grid-1 gap-px bg-black">
        {projects.map((p) => (
          <a key={p.id} href={`/work/${p.slug}`} className="group relative block bg-white">
            <div className="aspect-[4/3]">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cobaltBase/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-cobaltBase">
              <div className="px-6 text-center">
                <h4 className="font-neueMachina text-white text-xl md:text-2xl leading-tight">{p.title}</h4>
                <p className="mt-1 font-circularStd text-white/90 text-sm">{p.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Banner negro con CTA */}
      <div className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <span className="text-white/80">Explora todo nuestro portafolio</span>
          <a href="/work" className="rounded-full bg-white text-black hover:bg-cobaltBase hover:text-white transition px-4 py-2 text-sm">Más proyectos</a>
        </div>
      </div>
    </section>
  )
}

