import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {StatCard} from "@/components/ui/stat-card.tsx";
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {Scope} from "@/modules/assessment/components/overview/scope.tsx";
import {Details} from "@/modules/assessment/components/overview/details.tsx";
import {useGetAssessment} from "@/modules/assessment/lib/hooks/use-assessment-service.ts";
import {formatDateString} from "@/lib/utils.ts";

export const Route = createFileRoute(
    '/_protected/academics/assessments/$assessmentId/',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {assessmentId} = Route.useParams();

    const {error, isPending, data: assessment} = useGetAssessment(assessmentId);

    if (isPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;

    const startDate = formatDateString(assessment.startDate);
    const endDate = formatDateString(assessment.endDate);

    return (
        <Page>
            <PageTitle title={assessment.name}/>

            <div className={"flex flex-col gap-7"}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title={"Academic Year"} value={"2025"}/>
                    <StatCard title={"Duration"} value={`${startDate} → ${endDate}`}/>
                    <StatCard
                        title={"Scope"}
                        value={`${assessment.stats.scope.gradeCount} grades • ${assessment.stats.scope.subjectCount} subjects`}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Scope assessment={assessment}/>
                    <Details assessment={assessment}/>
                </div>
            </div>
        </Page>
    )
}