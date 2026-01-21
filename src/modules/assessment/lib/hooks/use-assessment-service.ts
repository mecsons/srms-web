import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from '@/api'
import {useMutation, useQuery} from '@tanstack/react-query'
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import type {AssessmentSchemaType} from "@/modules/assessment/lib/validations/assessment.ts";

const baseUrl = '/assessments'

export function useGetAssessments() {
    return useQuery({
        queryKey: queryKeys.assessments.all,
        queryFn: async () => {
            try {
                const response = await api.get(baseUrl)
                const {payload} = response.data

                return payload as IAssessment[]
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

export function useUpsertAssessment() {
    return useMutation({
        mutationFn: async (args: { data: AssessmentSchemaType; assessmentId?: string }) => {
            const {data, assessmentId} = args;

            try {
                if (assessmentId) {
                    await api.put(`${baseUrl}/${assessmentId}`, data);
                } else {
                    await api.post(baseUrl, data);
                }
            } catch (error) {
                handleServerError(error);
            }
        },
    });
}