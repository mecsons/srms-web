import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNotifyToast} from '@/hooks/use-notify.ts'
import type {ITeacher} from "@/modules/teacher/lib/types.ts";
import {useUpsertTeacher} from "@/modules/teacher/lib/hooks/use-teacher-service.ts";
import {defaultValues, teacherSchema, type TeacherSchemaType} from '@/modules/teacher/lib/validations/teacher.ts'

export function useTeacherForm(teacher?: ITeacher, options?: { onSuccess?: () => void }) {
    const {successToast, errorToast} = useNotifyToast()
    const upsertTeacher = useUpsertTeacher();

    const getDefaultValues = (): TeacherSchemaType => {
        if (teacher) {
            return {
                name: teacher.name,
                phoneNumber: teacher.phoneNumber,
                email: teacher.email,
            }
        }

        return defaultValues;
    };

    const form = useForm<TeacherSchemaType>({
        resolver: zodResolver(teacherSchema),
        defaultValues: getDefaultValues(),
    })

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await upsertTeacher.mutateAsync({
                data: values,
                teacherId: teacher?.id
            })

            form.reset()
            successToast(teacher ? "Teacher updated successfully" : "Teacher created successfully");
            options?.onSuccess?.();
        } catch (error) {
            errorToast(error)
        }
    })

    return {form, onSubmit, formIsSubmitting: form.formState.isSubmitting}
}