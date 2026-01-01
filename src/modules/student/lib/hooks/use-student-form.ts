import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNotifyToast } from '@/hooks/use-notify.ts'
import { useFormLocalStorage } from '@/hooks/use-local-storage.ts'
import {
  defaultValues,
  studentSchema,
  type StudentSchemaType,
} from '@/modules/student/lib/validations/student.ts'
import { useCreateStudent } from '@/modules/student/lib/hooks/use-student-service.ts'

export function useStudentForm(gradeId: string) {
  const { successToast, errorToast } = useNotifyToast()
  const createStudent = useCreateStudent(gradeId)

  const form = useForm<StudentSchemaType>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      ...defaultValues,
      gradeId,
    },
  })

  const { clearLocalStorage } = useFormLocalStorage(form, 'studentDraft')

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createStudent.mutateAsync(values)

      clearLocalStorage()
      form.reset()

      successToast('Student created successfully')
    } catch (error) {
      errorToast(error)
    }
  })

  return { form, onSubmit }
}
