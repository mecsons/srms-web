import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from '@/api'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {type StudentSchemaType} from '@/modules/student/lib/validations/student.ts'
import type {IEnrollment} from "@/modules/enrollment/lib/types.ts";

const baseUrl = '/students'

export function useGetActiveStudentsByGrade(gradeId: string) {
    return useQuery({
        queryKey: queryKeys.students.byGrade(gradeId),
        queryFn: async () => {
            try {
                const response = await api.get(`${baseUrl}/${gradeId}`)

                const {payload} = response.data

                return payload as IEnrollment[]
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

export function useUpsertStudent(gradeId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (args: { data: StudentSchemaType; studentId?: string }) => {
            const {data, studentId} = args;

            try {
                if (studentId) {
                    await api.put(`${baseUrl}/${studentId}`, data);
                } else {
                    await api.post(baseUrl, data);
                }
            } catch (error) {
                handleServerError(error);
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.students.byGrade(gradeId),
            });
        },
    });
}