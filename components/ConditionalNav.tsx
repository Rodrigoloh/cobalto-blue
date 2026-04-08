'use client'

import { usePathname } from 'next/navigation'

import { Nav } from '@/components/Nav'

export function ConditionalNav() {
  const pathname = usePathname()

  if (pathname.startsWith('/cb-lab')) {
    return null
  }

  return <Nav />
}
