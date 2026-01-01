export const queryKeys = {
  grades: {
    all: ["grades"] as const,
    byId: (id: string) => ["grades", id] as const,
  },

  students: {
    all: ["students"] as const,
    byId: (id: string) => ["students", id] as const,
    byGrade: (gradeId: string) => ["students", gradeId] as const,
  }
}