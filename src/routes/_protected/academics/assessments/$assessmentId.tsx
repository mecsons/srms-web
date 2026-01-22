import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useGetAssessment} from "@/modules/assessment/lib/hooks/use-assessment-service.ts";
import {OverviewTab} from "@/modules/assessment/components/overview/tab.tsx";
import {ResultsTab} from "@/modules/assessment/components/results/tab.tsx";

export const Route = createFileRoute(
    '/_protected/academics/assessments/$assessmentId',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {assessmentId} = Route.useParams();

    const {error, isPending, data: assessment} = useGetAssessment(assessmentId);

    if (isPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;

    return (
        <Page>
            <PageTitle title={assessment.name}/>

            <Tabs defaultValue="overview">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <OverviewTab assessment={assessment}/>
                </TabsContent>

                <TabsContent value="results">
                    <ResultsTab/>
                </TabsContent>
            </Tabs>
        </Page>
    )
}