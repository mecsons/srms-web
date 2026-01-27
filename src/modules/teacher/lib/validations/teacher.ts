import * as z from 'zod'
import {TANZANIA_PHONE_NUMBER_REGEX} from '@/lib/consts'

export const teacherSchema = z.object({
    name: z.string().trim().nonempty('Name is required'),
    phoneNumber: z
        .string()
        .trim()
        .nonempty('Phone number is required')
        .regex(TANZANIA_PHONE_NUMBER_REGEX, 'Invalid phone number.'),
    email: z
        .email()
        .trim()
        .nonempty('Email is required')
})

export type TeacherSchemaType = z.infer<typeof teacherSchema>

export const defaultValues: TeacherSchemaType = Object.fromEntries(
    Object.keys(teacherSchema.shape).map((key) => [key, '']),
) as TeacherSchemaType