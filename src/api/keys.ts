export const queryKeys = {
    grades: {
        all: ["grades"] as const,
        withSubjects: ["grades", "withSubjects"] as const,
    },

    students: {
        all: ["students"] as const,
        byGrade: (gradeId: string) => ["students", String(gradeId)] as const,
    },

    assessments: {
        all: ["assessments"] as const,
        byId: (assessmentId: string) => ["assessments", String(assessmentId)] as const,
    },

    results: {
        assessment: (assId: string, resId: string) => ["results", String(assId), String(resId)] as const,
    }
}