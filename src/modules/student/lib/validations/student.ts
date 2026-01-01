import * as z from 'zod'
import { TANZANIA_PHONE_NUMBER_REGEX } from '@/lib/consts'

export const studentSchema = z.object({
  name: z.string().trim().nonempty('Name is required'),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('Phone number is required')
    .regex(TANZANIA_PHONE_NUMBER_REGEX, 'Invalid phone number.'),
  gradeId: z.string().nonempty('Grade ID is required'),
})

export type StudentSchemaType = z.infer<typeof studentSchema>

export const defaultValues: StudentSchemaType = Object.fromEntries(
  Object.keys(studentSchema.shape).map((key) => [key, '']),
) as StudentSchemaType
