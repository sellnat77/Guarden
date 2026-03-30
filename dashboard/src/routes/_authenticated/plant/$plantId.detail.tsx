import { createFileRoute } from '@tanstack/react-router'
import { PlantDetailPage } from '@/components/PlantDetail/PlantDetailPage';

export const Route = createFileRoute('/_authenticated/plant/$plantId/detail')({
  component: RouteComponent,
})

function RouteComponent() {
  const { plantId } = Route.useParams();

  return <PlantDetailPage plantId={plantId} />
}
