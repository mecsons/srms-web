import { Spinner } from '@/components/ui/spinner.tsx'
import { ErrorAlert } from '@/components/ui/alert.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { Page, PageTitle } from '@/components/ui/page.tsx'
import { UpsertStudent } from '@/modules/student/components/upsert-student.tsx'
import { useGetStudentsByGrade } from '@/modules/student/lib/hooks/use-student-service.ts'

export const Route = createFileRoute('/_protected/students/$gradeId')({
  component: StudentList,
})

function StudentList() {
  const { gradeId } = Route.useParams()
  const { error, isPending, data: students } = useGetStudentsByGrade(gradeId)

  if (isPending) return <Spinner />
  if (error) return <ErrorAlert error={error} />

  console.log(students)

  return (
    <Page>
      <PageTitle title={`Students in ${gradeId}`} description={`Students in ${gradeId}`}/>

      <UpsertStudent gradeId={gradeId} />
    </Page>
  )
}
