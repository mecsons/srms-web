import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNotifyToast} from "@/hooks/use-notify.ts";
import type {IGradeSubject} from "@/modules/grade/lib/types";
import type {ITeacherAssignmentSummary} from "@/modules/teacher/lib/types";
import {useAssignSubjectTeachers} from "@/modules/teacher/lib/hooks/use-teacher-service.ts";
import {
    assignSubjectTeachersSchema,
    defaultValues,
    type AssignSubjectTeachersSchemaType,
} from "@/modules/teacher/lib/validations/assign-subject-teachers";

export function useAssignSubjectTeachersForm(gradeSubject: IGradeSubject, assignedTeachers: ITeacherAssignmentSummary[], options?: {
    onSuccess?: () => void
}) {
    const {successToast, errorToast} = useNotifyToast();
    const assignSubjectTeachers = useAssignSubjectTeachers(gradeSubject.gradeId)

    const resolvedDefaults = useMemo<AssignSubjectTeachersSchemaType>(() => {
        return {
            gradeSubjectId: gradeSubject.id,
            teacherIds: assignedTeachers.map((a) => a.teacher.id),
        };
    }, [gradeSubject.id, assignedTeachers]);

    const form = useForm<AssignSubjectTeachersSchemaType>({
        resolver: zodResolver(assignSubjectTeachersSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(resolvedDefaults);
    }, [form, resolvedDefaults]);

    const selectedCount = form.watch("teacherIds")?.length ?? 0;

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await assignSubjectTeachers.mutateAsync(data);

            form.reset()
            successToast("Assigned successfully");
            options?.onSuccess?.();
        } catch (error) {
            errorToast(error);
        }
    });

    return {
        form,
        selectedCount,
        onSubmit,
        formIsSubmitting: form.formState.isSubmitting,
        formIsDirty: form.formState.isDirty,
    };
}