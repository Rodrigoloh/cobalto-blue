type Item = {
  id: number
  title: string
  image: string
  href?: string
  tag?: string
}

const items: Item[] = [
  { id: 1, title: 'Navigation Solutions', image: '/work/proyecto-1.jpg', href: '#' },
  { id: 2, title: 'Packaging Concept', image: '/work/proyecto-2.jpg', href: '#' },
  { id: 3, title: 'Digital Product', image: '/work/proyecto-3.jpg', href: '#' },
  { id: 4, title: 'Brand Launch', image: '/work/proyecto-4.jpg', href: '#' },
  { id: 5, title: 'Interactive Editorial', image: '/work/proyecto-5.jpg', href: '#' },
  { id: 6, title: 'Experiential Campaign', image: '/work/proyecto-6.jpg', href: '#' },
]

export default function ProjectsGrid() {
  return (
    <section id="work" className="section flex items-start bg-white">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-semibold">Proyectos</h2>
          <a href="/work" className="text-sm text-neutral-600 hover:underline">Ver todos</a>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <a key={it.id} href={it.href} className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-medium text-neutral-900">{it.title}</h3>
                {it.tag && <p className="text-sm text-neutral-500 mt-1">{it.tag}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

