import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/academics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/academics/"!</div>
}
