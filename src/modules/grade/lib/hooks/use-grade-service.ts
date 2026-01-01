import { api, handleServerError } from '@/api'
import { useQuery } from '@tanstack/react-query'
import type {IGrade} from "@/modules/grade/lib/types.ts";
import {queryKeys} from "@/api/keys.ts";

const baseUrl = '/grades'

export function useGetAllGrades() {
  return useQuery({
    queryKey: queryKeys.grades.all,
    queryFn: async () => {
      try {
        const response = await api.get(baseUrl)
        const { payload } = response.data

        return payload as IGrade[]
      } catch (error) {
        handleServerError(error)
      }
    },
  })
}