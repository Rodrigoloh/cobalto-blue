import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = projects.find((x) => x.slug === params.slug)
  if (!p) return { title: 'Proyecto' }
  return { title: `${p.title} — Proyecto`, description: p.desc }
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params
  const p = projects.find((x) => x.slug === slug)
  if (!p) return notFound()

  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/work" className="text-sm text-black/60 hover:underline">← Volver a proyectos</Link>
        <h1 className="mt-4 font-neueMachina text-4xl md:text-6xl">{p.title}</h1>
        <p className="mt-3 font-circularStd text-black/70">{p.desc}</p>

        {p.detail && (
          <div className="mt-6">
            <p className="font-circularStd text-black/80 whitespace-pre-line leading-relaxed">{p.detail}</p>
          </div>
        )}
      </div>
    </main>
  )
}
