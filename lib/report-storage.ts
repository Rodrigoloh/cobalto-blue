import { promises as fs } from 'fs'
import path from 'path'

import type { ProspectReport } from '@/lib/performance-report'

const REPORTS_DIR = process.env.REPORT_STORAGE_DIR || path.join('/tmp', 'cobalto-blue-reports')

function getReportPath(id: string) {
  return path.join(REPORTS_DIR, `${id}.json`)
}

async function ensureReportsDir() {
  await fs.mkdir(REPORTS_DIR, { recursive: true })
}

export async function storeReport(report: ProspectReport) {
  await ensureReportsDir()
  await fs.writeFile(getReportPath(report.id), JSON.stringify(report, null, 2), 'utf8')
}

export async function readReport(id: string) {
  try {
    const file = await fs.readFile(getReportPath(id), 'utf8')
    return JSON.parse(file) as ProspectReport
  } catch {
    return null
  }
}

export async function listReports() {
  await ensureReportsDir()

  const files = await fs.readdir(REPORTS_DIR)
  const reports = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        try {
          const content = await fs.readFile(path.join(REPORTS_DIR, file), 'utf8')
          return JSON.parse(content) as ProspectReport
        } catch {
          return null
        }
      })
  )

  return reports
    .filter((report): report is ProspectReport => Boolean(report))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}
