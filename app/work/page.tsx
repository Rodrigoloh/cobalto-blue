import ProjectsGrid from '@/components/ProjectsGrid'

export default function WorkPage(){
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-semibold">Proyectos</h1>
        <p className="mt-2 text-neutral-600">Selección de trabajos recientes.</p>
      </div>
      <div className="mt-6">
        <ProjectsGrid />
      </div>
    </main>
  )
}
