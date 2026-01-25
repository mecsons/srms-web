import {z} from "zod";

export const assessmentScopeItemSchema = z.object({
    gradeId: z.string().trim().nonempty("Grade ID is required"),
    gradeSubjectIds: z
        .array(z.string().min(1))
        .min(1, "At least one grade subject is required")
        .refine((arr) => new Set(arr).size === arr.length, "Duplicate grade subject IDs are not allowed"),
});

export const assessmentScopeSchema = z
    .array(assessmentScopeItemSchema)
    .min(1, "Assessment Scope is required")
    .refine(
        (scopes) => new Set(scopes.map((s) => s.gradeId)).size === scopes.length,
        {message: "Each grade can only be added once"}
    );

export const assessmentSchema = z
    .object({
        name: z.string().trim().nonempty("Assessment name is required"),
        startDate: z.string().trim().nonempty("Start date is required"),
        endDate: z.string().trim().nonempty("End date is required"),
        scope: assessmentScopeSchema,
        status: z.enum(["ACTIVE", "CLOSED"]).optional(),
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