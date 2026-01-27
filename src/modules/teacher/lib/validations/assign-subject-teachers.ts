import { z } from "zod";

export const assignSubjectTeachersSchema = z.object({
    gradeSubjectId: z.string().trim().nonempty("Grade subject ID is required"),
    teacherIds: z
        .array(z.string().min(1))
        .min(1, "At least one teacher must be assigned")
        .refine((arr) => new Set(arr).size === arr.length, "Duplicate teacher IDs are not allowed"),
});

export type AssignSubjectTeachersSchemaType = z.infer<typeof assignSubjectTeachersSchema>;

export const defaultValues: AssignSubjectTeachersSchemaType = {
    gradeSubjectId: "",
    teacherIds: [],
};