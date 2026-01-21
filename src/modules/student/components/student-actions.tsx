import type {IEnrollment} from "@/modules/enrollment/lib/types.ts";
import {UpsertStudent} from "@/modules/student/components/upsert-student.tsx";

interface Props {
    enrollment: IEnrollment
}

export function StudentActions({enrollment}: Props) {
    return (
        <div className="space-x-3">
            <UpsertStudent
                student={enrollment.student}
                gradeId={enrollment.grade.id}
            />
        </div>
    );
}