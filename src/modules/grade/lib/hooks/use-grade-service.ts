import {api, handleServerError} from '@/api'
import {useQuery} from '@tanstack/react-query'
import type {IGrade, IGradeWithSubjects} from "@/modules/grade/lib/types.ts";
import {queryKeys} from "@/api/keys.ts";

const baseUrl = '/grades'

export function useGetAllGrades() {
    return useQuery({
        queryKey: queryKeys.grades.all,
        queryFn: async () => {
            try {
                const response = await api.get(baseUrl)
                const {payload} = response.data

                return payload as IGrade[]
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

export function useGetAllGradesWithSubjects() {
    return useQuery({
        queryKey: queryKeys.grades.withSubjects,
        queryFn: async () => {
            try {
                const response = await api.get(`${baseUrl}/include-subjects`)
                const {payload} = response.data

                return payload as IGradeWithSubjects[]
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}