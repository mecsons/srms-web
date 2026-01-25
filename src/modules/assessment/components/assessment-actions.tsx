import {Link} from "@tanstack/react-router";
import {FileText, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";

interface Props {
    assessment: IAssessment
}

export function UpsertAssessment({assessment}: Props){
    const {id: assessmentId, canEditAssessment} = assessment;

    return canEditAssessment && (
        <Link to={"/academics/assessments/upsert/edit/$assessmentId"} params={{assessmentId: assessmentId}}>
            <Button size="icon" variant="outline">
                <Pencil/>
            </Button>
        </Link>
    )

}

export function AssessmentActions({assessment}: Props) {
    const {id: assessmentId} = assessment;

    return (
        <div className="space-x-3">
            <UpsertAssessment assessment={assessment}/>

            <Link to={"/academics/assessments/$assessmentId"} params={{assessmentId: assessmentId}}>
                <Button size="icon" variant="outline">
                    <FileText/>
                </Button>
            </Link>
        </div>
    );
}