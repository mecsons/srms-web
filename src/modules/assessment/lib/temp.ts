type SubjectChip = { id: string; name: string };
type ScopeRow = { gradeId: string; gradeName: string; subjects: SubjectChip[] };

type AssessmentForUI = {
    id: string;
    name: string;
    status: "DRAFT" | "ONGOING" | "COMPLETED" | string;
    startDate: string;
    endDate: string;
    academicYear?: { name?: string } | string;
    createdBy?: { name?: string; avatarUrl?: string };
    createdAt?: string;
    scope: ScopeRow[];
    resultsCoverage?: { entered: number; total: number };
};

export const TEMP_ASSESSMENT: AssessmentForUI = {
    id: "1",
    name: "Midterm Exams",
    status: "ONGOING",
    startDate: "2026-01-15",
    endDate: "2026-01-29",
    academicYear: { name: "2025" },
    createdBy: { name: "Ringo Ebenezer" },
    createdAt: "2026-01-10T09:22:00",
    scope: [
        {
            gradeId: "1",
            gradeName: "Grade 1",
            subjects: [
                { id: "m1", name: "Mathematics" },
                { id: "e1", name: "English" },
                { id: "s1", name: "Science" },
                { id: "c1", name: "Civics" },
            ],
        },
        {
            gradeId: "2",
            gradeName: "Grade 2",
            subjects: [
                { id: "m2", name: "Mathematics" },
                { id: "e2", name: "English" },
                { id: "i2", name: "ICT" },
                { id: "g2", name: "Geography" },
            ],
        },
        {
            gradeId: "3",
            gradeName: "Grade 3",
            subjects: [
                { id: "m3", name: "Mathematics" },
                { id: "e3", name: "English" },
                { id: "s3", name: "Science" },
                { id: "h3", name: "History" },
                { id: "k3", name: "Kiswahili" },
            ],
        },
    ],
    resultsCoverage: { entered: 412, total: 520 },
};
