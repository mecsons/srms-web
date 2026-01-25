import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Spinner} from "@/components/ui/spinner";
import {ErrorAlert} from "@/components/ui/alert";
import {Download, Pencil, X} from "lucide-react";
import {Page, PageTitle} from "@/components/ui/page";
import {createFileRoute} from "@tanstack/react-router";
import {ResultsTable} from "@/modules/result/components/results-table";
import {useGetAssessmentResult} from "@/modules/result/lib/hooks/use-result-service";

export const Route = createFileRoute(
    "/_protected/academics/assessments/$assessmentId/results/$gradeId"
)({
    component: AssessmentResults,
});

function AssessmentResults() {
    const {assessmentId, gradeId} = Route.useParams();
    const {error, isPending, data: results} = useGetAssessmentResult(assessmentId, gradeId);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (results && !results.canEnterResults) setIsEditing(false);
    }, [results]);

    if (isPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;

    const {assessment, grade, canEnterResults} = results;

    return (
        <Page className="gap-5">
            <div className="flex justify-between items-center">
                <PageTitle title={`${assessment.name}, ${grade.name}`}/>

                <div className="flex items-center gap-2">
                    {canEnterResults && (
                        isEditing ? (
                            <Button size="icon" variant="outline" onClick={() => setIsEditing(false)}>
                                <X/>
                            </Button>
                        ) : (
                            <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
                                <Pencil/>
                            </Button>
                        )
                    )}

                    <Button size="icon" variant="outline">
                        <Download/>
                    </Button>
                </div>
            </div>

            <ResultsTable results={results} isEditing={isEditing}/>
        </Page>
    );
}