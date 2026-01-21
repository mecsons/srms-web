import {Pencil} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {Link} from "@tanstack/react-router";

interface Props {
    assessment: IAssessment
}

export function AssessmentActions({assessment}: Props) {
    return (
        <div className="space-x-3">
            <Link to={"/academics/assessments/upsert/edit/$assessmentId"} params={{assessmentId: assessment.id}}>
                <Button size="icon" variant="outline">
                    <Pencil/>
                </Button>
            </Link>
        </div>
    );
}