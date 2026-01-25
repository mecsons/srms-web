import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifyToast } from "@/hooks/use-notify.ts";
import {getSubjectColumns} from "@/modules/result/lib/utils.tsx";
import type { IAssessmentResults } from "@/modules/result/lib/types.ts";
import {useUpsertResults} from "@/modules/result/lib/hooks/use-result-service.ts";
import {assessmentResultsSchema, type AssessmentResultsSchemaType} from "@/modules/result/lib/validations/result.ts";

export function useAssessmentResultsForm(results: IAssessmentResults) {
    const { navigate } = useRouter();
    const { successToast, errorToast } = useNotifyToast();

    const submitResults = useUpsertResults();

    const resolvedDefaults = useMemo<AssessmentResultsSchemaType>(() => {
        const subjectColumns = getSubjectColumns(results);
        const formResults: AssessmentResultsSchemaType["results"] = [];

        for (const row of results.rows) {
            const studentId = row.student.id;

            for (const col of subjectColumns) {
                const gradeSubjectId = String(col.gradeSubjectId);

                const cell = row.results?.[gradeSubjectId] ?? null;
                const score = cell?.score == null ? "" : String(cell.score);

                formResults.push({studentId, gradeSubjectId: gradeSubjectId, score});
            }
        }

        return {
            assessmentId: results.assessment.id,
            results: formResults,
        };
    }, [results]);

    const form = useForm<AssessmentResultsSchemaType>({
        resolver: zodResolver(assessmentResultsSchema),
        defaultValues: resolvedDefaults,
    });

    useEffect(() => {
        form.reset(resolvedDefaults);
    }, [resolvedDefaults, form]);

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            await submitResults.mutateAsync( {
                assessmentId: (data.assessmentId),
                results: data.results
                    .filter(r => r.score.trim() !== "")
                    .map(r => ({
                        studentId: (r.studentId),
                        gradeSubjectId: (r.gradeSubjectId),
                        score: (r.score),
                    })),
            });

            successToast("Results saved successfully");

            await navigate({
                to: "/academics/assessments/$assessmentId",
                params: {
                    assessmentId: (results.assessment.id),
                },
            });
        } catch (error) {
            errorToast(error);
        }
    });

    return {
        form,
        onSubmit,
        formIsSubmitting: form.formState.isSubmitting,
        formIsDirty: form.formState.isDirty,
    };
}