import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import NotFound from "@/components/ui/not-found.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {Page, PageTitle} from "@/components/ui/page.tsx";
import GradeCard from "@/modules/grade/components/grade-card.tsx";
import {useGetAllGrades} from "@/modules/grade/lib/hooks/use-grade-service.ts";

export const Route = createFileRoute('/_protected/academics/grades/')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = Route.useNavigate();
    const {error, isPending, data: grades} = useGetAllGrades()

    if (isPending) return <Spinner/>
    if (error) return <ErrorAlert error={error}/>

  return (
      <Page>
         <PageTitle
             title={"Grades"}
             description={"Manage grades, view subjects, and assign teachers by grade"}
         />

          {grades.length === 0 ? (
              <NotFound message={'No record found.'}/>
          ) : (
              <div className=" grid grid-cols-1 md:grid-cols-4 gap-4">
                  {grades.map((grade) => (
                      <GradeCard
                          key={grade.id}
                          grade={grade}
                          onClick={() =>
                              navigate({
                                  to: `/academics/grades/$gradeId`,
                                  params: {gradeId: grade.id},
                              })
                          }
                      />
                  ))}
              </div>
          )}
      </Page>
  )
}
