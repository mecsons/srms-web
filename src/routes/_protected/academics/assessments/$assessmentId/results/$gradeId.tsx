import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {ResultsEditTable} from "@/modules/result/components/results-edit-table.tsx";
import {useGetAssessmentResult} from "@/modules/result/lib/hooks/use-result-service.ts";
import {ResultsReadonlyTable} from "@/modules/result/components/results-readonly-table.tsx";

export const Route = createFileRoute(
    '/_protected/academics/assessments/$assessmentId/results/$gradeId',
)({
    component: AssessmentResults,
})

function AssessmentResults() {
    const {assessmentId, gradeId} = Route.useParams();
    const {error, isPending, data: results} = useGetAssessmentResult(assessmentId, gradeId);

    if (isPending) return <Spinner/>
    if (error) return <ErrorAlert error={error}/>

    const {assessment, grade, canEnterResults} = results;

    return (
        <Page>
            <PageTitle title={`${assessment.name}, ${grade.name}`}/>

            {canEnterResults ? <ResultsEditTable results={results}/> : <ResultsReadonlyTable results={results}/>}
        </Page>
    )
}