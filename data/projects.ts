export type Rubro = 'Retail' | 'Salud' | 'Educación' | 'Fashion' | 'Wellness' | 'Industrias'

export type Project = {
  id: number
  slug: string
  title: string
  desc: string
  image: string
  rubro: Rubro
}

// Categorías disponibles para filtros
export const ALL_RUBROS = ['Retail', 'Salud', 'Educación', 'Fashion', 'Wellness', 'Industrias'] as const
export const RUBROS = ['Ver todos', ...ALL_RUBROS] as const

// Si quieres que un tile sea GIF, defínelo aquí por id
// Ejemplo: { 5: '/projects/project05.gif' }
export const GIF_OVERRIDES: Record<number, string> = {
  6: '/projects/project06.gif',
}

// Cambios de nombre por id (opcional)
// Ejemplo: { 1: 'Nombre proyecto 1', 2: 'App Salud XYZ' }
export const TITLE_OVERRIDES: Record<number, string> = {
  1: 'Scalpers Barcelona',
  2: '[Au]rora Lab',
  3: 'Silk Laundry',
  4: 'Pic+',
  5: 'Colaab',
  6: 'Creative Builders Consulting',
  7: 'ASP',
  8: 'L’Antica Grill & Bar',
  9: 'eBious',
  10: 'Carolina',
  11: 'L’Antica Wine',
  12: 'Doctores',
  13: 'Glow Science',
  14: 'Motofábrica',
  15: 'Le Mascotte',
}

// Descripciones por id
export const DESC_OVERRIDES: Record<number, string> = {
  1: 'Eyewear Catalog - Editorial',
  2: 'Branding + Ad Campaign + Interior',
  3: 'ADA - F/W Collection',
  4: 'Website - UI/UX',
  5: 'Branding + Web + App',
  6: 'Branding',
  7: 'Website - UI/UX',
  8: 'Brandig + Ad Campaign',
  9: 'Branding',
  10: 'Branding',
  11: 'Branding',
  12: 'Branding',
  13: 'Branding',
  14: 'Branding',
  15: 'Branding + Ad Campaign + Packaging',
}

// Cambiar rubro por id (opcional)
// Ejemplo: { 2: 'Salud', 5: 'Fashion' }
export const RUBRO_OVERRIDES: Record<number, Rubro> = {}

// Proyectos base (16) alineados con public/projects/project01..16.png
export const projects: Project[] = Array.from({ length: 15 }, (_, i) => {
  const n = i + 1
  const num = String(n).padStart(2, '0')
  const rubros = ALL_RUBROS as unknown as Rubro[]
  return {
    id: n,
    slug: `proyecto-${num}`,
    title: TITLE_OVERRIDES[n] ?? `Proyecto ${num}`,
    desc: DESC_OVERRIDES[n] ?? 'Pequeña descripción del proyecto.',
    image: GIF_OVERRIDES[n] ?? `/projects/project${num}.png`,
    rubro: RUBRO_OVERRIDES[n] ?? rubros[i % rubros.length],
  }
})
