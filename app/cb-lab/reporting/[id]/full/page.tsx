import { FullReportRouteClient } from './FullReportRouteClient'

type RoutePageProps = {
  params: {
    id: string
  }
}

export default function FullReportRoutePage({ params }: RoutePageProps) {
  return <FullReportRouteClient id={params.id} />
}
