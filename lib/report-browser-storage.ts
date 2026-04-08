'use client'

import type { ProspectReport } from '@/lib/performance-report'

const STORAGE_KEY = 'cobalto.blue/prospect-reports'
const STORAGE_LIMIT = 10

function isBrowser() {
  return typeof window !== 'undefined'
}

function sanitizeReports(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as ProspectReport[]
  }

  return value.filter((item): item is ProspectReport => {
    return Boolean(
      item &&
      typeof item === 'object' &&
      typeof (item as ProspectReport).id === 'string' &&
      typeof (item as ProspectReport).createdAt === 'string' &&
      (item as ProspectReport).input
    )
  })
}

export function getStoredReports() {
  if (!isBrowser()) {
    return [] as ProspectReport[]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return [] as ProspectReport[]
    }

    return sanitizeReports(JSON.parse(raw)).sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt)
    )
  } catch {
    return [] as ProspectReport[]
  }
}

export function getStoredReport(id: string) {
  return getStoredReports().find((report) => report.id === id) ?? null
}

export function saveStoredReport(report: ProspectReport) {
  if (!isBrowser()) {
    return
  }

  const current = getStoredReports().filter((item) => item.id !== report.id)
  const next = [report, ...current]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, STORAGE_LIMIT)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
