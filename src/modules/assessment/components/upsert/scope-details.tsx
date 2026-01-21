import {useFormContext} from "react-hook-form";
import {FieldGroup} from "@/components/ui/field.tsx";
import {ScopDetailsTitle} from "@/modules/assessment/components/upsert/title.tsx";
import type {AssessmentSchemaType} from "@/modules/assessment/lib/validations/assessment";
import type {IGradeWithSubjects} from "@/modules/grade/lib/types.ts";

interface Props {
    grades: IGradeWithSubjects[]
}

export function ScopeDetails({grades}: Props) {
    const {control, formState: {isSubmitting}} = useFormContext<AssessmentSchemaType>();

    return (
        <div className="flex flex-col gap-6">
            <ScopDetailsTitle/>

            <FieldGroup>

            </FieldGroup>
        </div>
    );
}