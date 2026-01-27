export const queryKeys = {
    grades: {
        all: ["grades"] as const,
        byId: (gradeId: string) => ["grade", String(gradeId)] as const,
        withSubjects: ["grades", "withSubjects"] as const,
    },

    students: {
        all: ["students"] as const,
        byGrade: (gradeId: string) => ["students", String(gradeId)] as const,
    },

    teachers:{
        all: ["teachers"] as const,
    },

    assessments: {
        all: ["assessments"] as const,
        byId: (assessmentId: string) => ["assessment", String(assessmentId)] as const,
    },

    results: {
        grade: (assId: string, resId: string) => ["results", String(assId), String(resId)] as const,
    }
}