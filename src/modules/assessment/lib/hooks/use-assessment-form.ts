import {useEffect, useMemo} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "@tanstack/react-router";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNotifyToast} from "@/hooks/use-notify.ts";
import {useFormLocalStorage} from "@/hooks/use-local-storage.ts";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {useUpsertAssessment} from "@/modules/assessment/lib/hooks/use-assessment-service.ts";
import {
    assessmentSchema,
    defaultValues,
    type AssessmentSchemaType
} from "@/modules/assessment/lib/validations/assessment.ts";

export function useAssessmentForm(assessment?: IAssessment) {
    const {navigate} = useRouter();
    const {successToast, errorToast} = useNotifyToast();
    const upsertAssessment = useUpsertAssessment();

    const resolvedDefaults = useMemo<AssessmentSchemaType>(() => {
        if (!assessment) return defaultValues;

        return {
            name: assessment.name,
            startDate: assessment.startDate,
            endDate: assessment.endDate,
            status: assessment.status,
            scope: assessment.scope.map((item) => ({
                gradeId: String(item.grade.id),
                subjectIds: item.subjects.map((s) => String(s.id)),
            })),
        };
    }, [assessment]);

    const form = useForm<AssessmentSchemaType>({
        resolver: zodResolver(assessmentSchema),
        defaultValues: resolvedDefaults,
    });

    useEffect(() => {
        if (assessment) {
            form.reset(resolvedDefaults);
        }
    }, [assessment, resolvedDefaults, form]);

    const {clearLocalStorage} = useFormLocalStorage(form, "assessmentDraft", !assessment);

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            const isEdit = !!assessment?.id;

            await upsertAssessment.mutateAsync({data, assessmentId: assessment?.id});

            clearLocalStorage();
            form.reset(resolvedDefaults);

            successToast(isEdit ? "Assessment updated successfully" : "Assessment created successfully");

            await navigate({to: "/academics/assessments"});
        } catch (error) {
            errorToast(error);
        }
    });

    return {
        form,
        onSubmit,
        formIsSubmitting: form.formState.isSubmitting,
    };
}
