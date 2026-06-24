import { FullReportPage } from './FullReportPage'
import fullReportMockData from './mock-data.json'

type RoutePageProps = {
  params: {
    id: string
  }
}

export default function FullReportRoutePage(_props: RoutePageProps) {
  return <FullReportPage mockData={fullReportMockData} />
}
