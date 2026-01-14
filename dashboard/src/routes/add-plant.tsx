import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-plant')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/plant"!</div>
}
