import {z} from "zod";

const resultSchema = z.object({
    studentId: z.string().nonempty("Student ID is required"),
    subjectId: z.string().nonempty("Subject ID is required"),
    score: z.string().trim(),
});

export const assessmentResultsSchema = z.object({
    assessmentId: z.string().nonempty("Grade ID is required"),
    results: z.array(resultSchema).nonempty("At least one row is required"),
});

export type AssessmentResultsSchemaType = z.infer<typeof assessmentResultsSchema>;