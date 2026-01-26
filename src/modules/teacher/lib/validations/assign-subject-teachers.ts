import { z } from "zod";

export const assignSubjectTeachersSchema = z.object({
    gradeSubjectId: z.string().trim().nonempty("Grade subject ID is required"),
    teacherIds: z
        .array(z.string().min(1))
        .refine((arr) => new Set(arr).size === arr.length, "Duplicate teacher IDs are not allowed"),
});

export type AssignSubjectTeachersSchemaType = z.infer<typeof assignSubjectTeachersSchema>;

export const defaultValues: AssignSubjectTeachersSchemaType = {
    gradeSubjectId: "",
    teacherIds: [],
};