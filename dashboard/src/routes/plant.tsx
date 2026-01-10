import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/plant')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/plant"!</div>
}
