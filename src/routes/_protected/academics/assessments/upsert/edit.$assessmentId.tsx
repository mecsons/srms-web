import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/academics/assessments/upsert/edit/$assessmentId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_protected/academics/assessments/upsert/update/$assessmentId"!
    </div>
  )
}
