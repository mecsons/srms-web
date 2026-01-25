import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from "@/api";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {IAssessmentResults} from "@/modules/result/lib/types.ts";
import type {AssessmentResultsSchemaType} from "@/modules/result/lib/validations/result.ts";

const baseUrl = '/results'

export function useGetAssessmentResult(assessmentId: string, gradeId: string) {
    return useQuery({
        queryKey: queryKeys.results.grade(assessmentId, gradeId),
        queryFn: async () => {
            try {
                const response = await api.get(`${baseUrl}/${assessmentId}/${gradeId}`)

                const {payload} = response.data

                return payload as IAssessmentResults
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

export function useUpsertResults() {
    return useMutation({
        mutationFn: async (data: AssessmentResultsSchemaType) => {
            try {
                await api.post(baseUrl, data);
            } catch (error) {
                handleServerError(error);
            }
        },
    });
}