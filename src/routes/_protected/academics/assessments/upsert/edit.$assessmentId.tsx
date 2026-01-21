import {FilePenLine} from "lucide-react";
import {FormProvider} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import ScopeDetails from "@/modules/assessment/components/upsert/scope";
import {BasicDetails} from "@/modules/assessment/components/upsert/basic-details.tsx";
import {useAssessmentForm} from "@/modules/assessment/lib/hooks/use-assessment-form.ts";
import {useGetAssessment} from "@/modules/assessment/lib/hooks/use-assessment-service.ts";
import {useGetAllGradesWithSubjects} from "@/modules/grade/lib/hooks/use-grade-service.ts";

export const Route = createFileRoute(
    '/_protected/academics/assessments/upsert/edit/$assessmentId',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const {assessmentId} = Route.useParams();

    const {error, isPending, data: existingAssessment} = useGetAssessment(assessmentId);
    const {error: gradesError, isPending: gradesPending, data: allGrades} = useGetAllGradesWithSubjects();

    const {form, onSubmit, formIsSubmitting} = useAssessmentForm(existingAssessment);

    if (isPending || gradesPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;
    if (gradesError) return <ErrorAlert error={gradesError}/>;
    if (!existingAssessment) return <ErrorAlert error={new Error("Assessment not found")}/>;

    return (
        <Page>
            <PageTitle title={"Edit Assessment"} description={"Update the details for this assessment"}/>

            <div className={"pb-8"}>
                <Card>
                    <CardContent>
                        <FormProvider {...form}>
                            <form className={"grid gap-8"} onSubmit={onSubmit}>
                                <BasicDetails/>

                                <ScopeDetails grades={allGrades}/>

                                <Button type={"submit"} className={"mx-auto"} disabled={formIsSubmitting}>
                                    <FilePenLine/>
                                    Update Assessment
                                </Button>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
        </Page>
    )
}
