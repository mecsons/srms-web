import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {IGradeSubject} from "@/modules/grade/lib/types";
import type {ITeacherAssignmentSummary} from "@/modules/teacher/lib/types";
import {
    assignSubjectTeachersSchema,
    defaultValues,
    type AssignSubjectTeachersSchemaType,
} from "@/modules/teacher/lib/validations/assign-subject-teachers";
import {useNotifyToast} from "@/hooks/use-notify.ts";

export function useAssignSubjectTeachersForm(subject: IGradeSubject, assignedTeachers: ITeacherAssignmentSummary[], options?: {
    onSuccess?: () => void
}) {
    const {successToast, errorToast} = useNotifyToast();

    const resolvedDefaults = useMemo<AssignSubjectTeachersSchemaType>(() => {
        return {
            gradeSubjectId: subject.id,
            teacherIds: assignedTeachers.map((a) => a.teacher.id),
        };
    }, [subject.id, assignedTeachers]);

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
            console.log(data);

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