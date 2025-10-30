export type Rubro = 'Retail' | 'Salud' | 'Educación' | 'Fashion' | 'Wellness' | 'Industrias'

export type Project = {
  id: number
  slug: string
  title: string
  desc: string
  image: string
  rubro: Rubro
  detail?: string
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

// Texto largo opcional para la página de detalle.
// Saltos de línea:
// - Usa '\n' para un salto de línea.
// - Usa '\n\n' para separar párrafos.
// Alternativa sin escapes: puedes usar template strings (backticks) para escribir multi‑línea.
//   Ejemplo:
//   1: `Primera línea\n\nSegunda línea`  (o directamente en varias líneas entre backticks)
// Render: se usa `whitespace-pre-line`, así que los saltos se respetan.
export const DETAIL_OVERRIDES: Record<number, string> = {
  1: 'Scalpers Barcelona — Eyewear Catalog - Editorial.\n\nAgrega aquí la descripción larga: objetivos, alcance, entregables, resultados y aprendizajes.',
  2: '[Au]rora Lab — Branding + Ad Campaign + Interior.\n\nAgrega aquí la descripción larga: concepto de marca, key visuals, campaña y diseño interior.',
  3: 'Silk Laundry — ADA - F/W Collection.\n\nAgrega aquí la descripción larga: narrativa de temporada, dirección de arte, y ejecución.',
  4: 'Pic+ — Website - UI/UX.\n\nAgrega aquí la descripción larga: arquitectura de información, wireframes, UI y prototipado.',
  5: 'Colaab — Branding + Web + App.\n\nAgrega aquí la descripción larga: identidad, sistema digital y producto.',
  6: 'Creative Builders Consulting — Branding.\n\nAgrega aquí la descripción larga: plataforma de marca, tono y aplicaciones.',
  7: 'ASP — Website - UI/UX.\n\nAgrega aquí la descripción larga: research, UX flows, UI y componentes.',
  8: 'L’Antica Grill & Bar — Brandig + Ad Campaign.\n\nAgrega aquí la descripción larga: identidad visual, narrativa y campaña.',
  9: 'eBious — Branding.\n\nAgrega aquí la descripción larga: naming (si aplica), identidad y guidelines.',
  10: 'Carolina — Branding.\n\nAgrega aquí la descripción larga: propósito, valores y universo visual.',
  11: 'L’Antica Wine — Branding.\n\nAgrega aquí la descripción larga: etiqueta, lenguaje gráfico y sistema.',
  12: 'Doctores — Branding.\n\nAgrega aquí la descripción larga: identidad, tono y aplicaciones.',
  13: 'Glow Science — Branding.\n\nAgrega aquí la descripción larga: pilares de comunicación, logo y sistema.',
  14: 'Motofábrica — Branding.\n\nAgrega aquí la descripción larga: espíritu de marca, tipografía y paleta.',
  15: 'Le Mascotte — Branding + Ad Campaign + Packaging.\n\nAgrega aquí la descripción larga: storytelling, campaña y empaque.',
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
    detail: DETAIL_OVERRIDES[n],
  }
})
