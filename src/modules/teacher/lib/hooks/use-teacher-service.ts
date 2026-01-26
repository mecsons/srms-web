import {queryKeys} from "@/api/keys.ts";
import {api, handleServerError} from "@/api";
import type {ITeacher} from "@/modules/teacher/lib/types.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {TeacherSchemaType} from "@/modules/teacher/lib/validations/teacher.ts";

const baseUrl = '/teachers'

export function useGetAllTeachers() {
    return useQuery({
        queryKey: queryKeys.teachers.all,
        queryFn: async () => {
            try {
                const response = await api.get(baseUrl)
                const {payload} = response.data

                return payload as ITeacher[]
            } catch (error) {
                handleServerError(error)
            }
        },
    })
}

export function useUpsertTeacher() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (args: { data: TeacherSchemaType; teacherId?: string }) => {
            const {data, teacherId} = args;

            try {
                if (teacherId) {
                    await api.put(`${baseUrl}/${teacherId}`, data);
                } else {
                    await api.post(baseUrl, data);
                }
            } catch (error) {
                handleServerError(error);
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeys.teachers.all,
            });
        },
    });
}