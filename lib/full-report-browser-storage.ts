'use client'

const STORAGE_KEY = 'cobalto.blue/full-report-json'
const STORAGE_LIMIT = 20

export type FullReportSnapshot = {
  id: string
  createdAt: string
  mockData: any
}

function isBrowser() {
  return typeof window !== 'undefined'
}

function sanitizeSnapshots(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as FullReportSnapshot[]
  }

  return value.filter((item): item is FullReportSnapshot => {
    return Boolean(
      item &&
        typeof item === 'object' &&
        typeof (item as FullReportSnapshot).id === 'string' &&
        typeof (item as FullReportSnapshot).createdAt === 'string' &&
        (item as FullReportSnapshot).mockData
    )
  })
}

export function getStoredFullReports() {
  if (!isBrowser()) {
    return [] as FullReportSnapshot[]
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return [] as FullReportSnapshot[]
    }

    return sanitizeSnapshots(JSON.parse(raw)).sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt)
    )
  } catch {
    return [] as FullReportSnapshot[]
  }
}

export function getStoredFullReport(id: string) {
  return getStoredFullReports().find((report) => report.id === id) ?? null
}

export function saveStoredFullReport(snapshot: FullReportSnapshot) {
  if (!isBrowser()) {
    return
  }

  const current = getStoredFullReports().filter((item) => item.id !== snapshot.id)
  const next = [snapshot, ...current]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, STORAGE_LIMIT)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
