import Link from 'next/link'

type Props = { params: { slug: string } }

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params
  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/work" className="text-sm text-black/60 hover:underline">← Volver a proyectos</Link>
        <h1 className="mt-4 font-neueMachina text-4xl md:text-6xl">{slug.replace(/-/g, ' ')}</h1>
        <p className="mt-3 font-circularStd text-black/70">Página de detalle del proyecto. Aquí podrás agregar imágenes y contenido específico más adelante.</p>
      </div>
    </main>
  )
}

