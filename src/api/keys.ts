export const queryKeys = {
  grades: {
    all: ["grades"] as const,
  },

  students: {
    all: ["students"] as const,
    byGrade: (gradeId: string) => ["students", gradeId] as const,
  },

  assessments:{
    all: ["assessments"] as const,
  }
}