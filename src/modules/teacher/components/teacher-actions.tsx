import type {ITeacher} from "@/modules/teacher/lib/types.ts";
import {UpsertTeacher} from "@/modules/teacher/components/upsert-teacher.tsx";

interface Props {
    teacher: ITeacher
}

export function TeacherActions({teacher}: Props) {
    return (
        <div className="space-x-3">
            <UpsertTeacher
                teacher={teacher}
            />
        </div>
    );
}