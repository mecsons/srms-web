import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from '@/api'
import {useQuery} from '@tanstack/react-query'
import type {IGrade, IGradeDetails, IGradeWithSubjects} from "@/modules/grade/lib/types.ts";

const baseUrl = '/grades'

export function useGetGrade(gradeId: string) {
    return useQuery({
        queryKey: queryKeys.grades.byId(gradeId),
        queryFn: async () => {
            try {
                const response = await api.get(`${baseUrl}/${gradeId}`);
                const {payload} = response.data

                return payload as IGradeDetails
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

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