import {z} from "zod";

export const assessmentSchema = z
    .object({
        name: z.string().trim().min(1, 'Assessment name is required'),
        startDate: z.string().trim().min(1, "Start date is required"),
        endDate: z.string().trim().min(1, "End date is required"),
        status: z.enum(["ACTIVE", "CLOSED"]).optional(),
        scope: z.array(z.object({
                gradeId: z.string().min(1, "Grade ID is required"),
                subjectIds: z
                    .array(z.string().min(1))
                    .min(1, "At least one subject is required")
                    .refine((arr) => new Set(arr).size === arr.length, "Duplicate subject IDs are not allowed"),
            })
        ).min(1, "Assessment Scope is required")
            .refine(
                (scopes) => new Set(scopes.map((s) => s.gradeId)).size === scopes.length,
                "Each grade can only be added once"
            ),
    })
    .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
        message: "End date must be on/after start date",
        path: ["endDate"],
    });

export type AssessmentSchemaType = z.infer<typeof assessmentSchema>;

export const defaultValues: AssessmentSchemaType = {
    name: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
    scope: [],
};