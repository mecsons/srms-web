import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useNotifyToast} from '@/hooks/use-notify.ts'
import type {IStudent} from "@/modules/student/lib/types.ts";
import {useUpsertStudent} from '@/modules/student/lib/hooks/use-student-service.ts'
import {defaultValues, studentSchema, type StudentSchemaType} from '@/modules/student/lib/validations/student.ts'

export function useStudentForm(gradeId: string, student?: IStudent, options?: { onSuccess?: () => void }) {
    const {successToast, errorToast} = useNotifyToast()
    const upsertStudent = useUpsertStudent(gradeId)

    const getDefaultValues = (): StudentSchemaType => {
        if (student) {
            return {
                name: student.name,
                phoneNumber: student.phoneNumber,
                gradeId: gradeId,
            }
        }

        return {
            ...defaultValues,
            gradeId: gradeId
        };
    };

    const form = useForm<StudentSchemaType>({
        resolver: zodResolver(studentSchema),
        defaultValues: getDefaultValues(),
    })

    const onSubmit = form.handleSubmit(async (values) => {
        try {
            await upsertStudent.mutateAsync({
                data: values,
                studentId: student?.id
            });

            form.reset()
            successToast(student ? "Student updated successfully" : "Student created successfully");
            options?.onSuccess?.();
        } catch (error) {
            errorToast(error)
        }
    })

    return {form, onSubmit, formIsSubmitting: form.formState.isSubmitting}
}
