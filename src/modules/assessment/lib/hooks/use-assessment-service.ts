import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from '@/api'
import {useQuery} from '@tanstack/react-query'
import type {IAssessment} from "@/modules/assessment/lib/types.ts";

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