import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {FilePlus, FileText, Pencil} from "lucide-react";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {Visibility} from "@/modules/auth/components/visibility.tsx";

export function CreateAssessment() {
    return (
        <Visibility visibleTo={"ROLE_ACADEMIC_ADMIN"}>
            <div className="flex items-center gap-2">
                <Link to={"/academics/assessments/upsert/create"}>
                    <Button>
                        <FilePlus/>
                    </Button>
                </Link>
            </div>
        </Visibility>
    )
}

export function UpsertAssessment({assessment}: { assessment: IAssessment }) {
    const {id: assessmentId, canEditAssessment} = assessment;

    return canEditAssessment && (
        <Visibility visibleTo={"ROLE_ACADEMIC_ADMIN"}>
            <Link to={"/academics/assessments/upsert/edit/$assessmentId"} params={{assessmentId: assessmentId}}>
                <Button size="icon" variant="outline">
                    <Pencil/>
                </Button>
            </Link>
        </Visibility>
    )
}

export function AssessmentActions({assessment}: { assessment: IAssessment }) {
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