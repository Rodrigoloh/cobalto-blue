import { projects } from '@/data/projects'

export default function ProjectsGrid() {
  return (
    <section id="work" className="section w-full bg-white">
      {/* Full-bleed grid: 2 columnas, 1 en pantallas verticales */}
      <div className="grid grid-cols-2 portrait-grid-1 gap-px bg-black">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group relative block overflow-hidden bg-white"
          >
            {/* Imagen base */}
            <div className="aspect-4-3">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlay al hover: texto azul */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <div className="px-6 text-center">
                <h3 className="font-bold text-cobaltBase text-2xl md:text-3xl leading-tight">{p.title}</h3>
                <p className="mt-2 font-circularStd text-cobaltBase/80 text-sm md:text-base">{p.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
