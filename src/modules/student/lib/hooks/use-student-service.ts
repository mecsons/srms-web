import {queryKeys} from "@/api/keys.ts";
import { api, handleServerError } from '@/api'
import type {IStudent} from "@/modules/student/lib/types.ts";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type StudentSchemaType } from '@/modules/student/lib/validations/student.ts'

const baseUrl = '/students'

export function useGetStudentsByGrade(gradeId: string) {
  return useQuery({
    queryKey: queryKeys.students.byGrade(gradeId),
    queryFn: async () => {
      try {
        const response = await api.get(`${baseUrl}/${gradeId}`)

        const { payload } = response.data

        return payload as IStudent[]
      } catch (error) {
        handleServerError(error)
      }
    },
  })
}

export function useCreateStudent(gradeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: StudentSchemaType) => {
      try {
        await api.post(baseUrl, data)
      } catch (error) {
        handleServerError(error)
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.students.byGrade(gradeId),
      })
    },
  })
}
