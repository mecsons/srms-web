import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from "@/api";
import {useQuery} from "@tanstack/react-query";
import type {IAssessmentResults} from "@/modules/result/lib/types.ts";

const baseUrl = '/assessments'

export function useGetAssessmentResult(assessmentId: string, gradeId: string) {
    return useQuery({
        queryKey: queryKeys.results.assessment(assessmentId, gradeId),
        queryFn: async () => {
            try {
                const response =
                    await api.get(`${baseUrl}/${assessmentId}/results/${gradeId}`)

                const {payload} = response.data

                return payload as IAssessmentResults
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}