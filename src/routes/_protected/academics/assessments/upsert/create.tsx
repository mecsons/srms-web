import {FormProvider} from "react-hook-form";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import ScopeDetails from "@/modules/assessment/components/upsert/scope";
import {BasicDetails} from "@/modules/assessment/components/upsert/basic-details.tsx";
import {useAssessmentForm} from "@/modules/assessment/lib/hooks/use-assessment-form.ts";
import {useGetAllGradesWithSubjects} from "@/modules/grade/lib/hooks/use-grade-service.ts";

export const Route = createFileRoute(
    '/_protected/academics/assessments/upsert/create',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {form, onSubmit} = useAssessmentForm();
    const {error, isPending, data: allGrades} = useGetAllGradesWithSubjects();

    if (isPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;

    return (
        <Page>
            <PageTitle title={"Create Assessment"} description={"Use the form below to create a new assessment"}/>

            <Card className={"pb-3"}>
                <CardContent>
                    <FormProvider {...form}>
                        <form className={"grid gap-8"} onSubmit={onSubmit}>
                            <BasicDetails/>

                            <ScopeDetails grades={allGrades}/>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </Page>
    )
}
