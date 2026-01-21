import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/students/graduates/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/students/graduates/"!</div>
}
