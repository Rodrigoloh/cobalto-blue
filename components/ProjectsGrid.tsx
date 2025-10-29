type Project = {
  id: number
  slug: string
  title: string
  desc: string
  image: string
}

// 16 proyectos iniciales; se pueden extender sin tocar el layout
const projects: Project[] = Array.from({ length: 16 }, (_, i) => {
  const n = i + 1
  const num = String(n).padStart(2, '0')
  return {
    id: n,
    slug: `proyecto-${num}`,
    title: `Proyecto ${num}`,
    desc: 'Pequeña descripción del proyecto.',
    // Ruta sugerida (PNG). Si el archivo no existe aún, puedes reemplazarlo por el real cuando lo tengas.
    image: `/projects/project${num}.png`,
  }
})

export default function ProjectsGrid() {
  return (
    <section id="work" className="section w-full bg-white">
      {/* Full-bleed grid: 2 columnas, 1 en pantallas verticales */}
      <div className="grid grid-cols-2 portrait-grid-1 gap-px bg-black">
        {projects.map((p) => (
          <a
            key={p.id}
            href={`/work/${p.slug}`}
            className="group relative block overflow-hidden bg-white"
            aria-label={p.title}
          >
            {/* Imagen base */}
            <div className="aspect-[4/3]">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlay al hover: fondo cobalto y texto blanco */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cobaltBase/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-cobaltBase group-focus-visible:opacity-100 group-focus-visible:bg-cobaltBase"
            >
              <div className="px-6 text-center">
                <h3 className="font-neueMachina text-white text-2xl md:text-3xl leading-tight">{p.title}</h3>
                <p className="mt-2 font-circularStd text-white/90 text-sm md:text-base">{p.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
