import type {IGrade} from "@/modules/grade/lib/types.ts";
import type {IStudent} from "@/modules/student/lib/types.ts";
import type {IAssessmentSummary} from "@/modules/assessment/lib/types.ts";

interface IAssessmentResultCell {
    id: string;
    score: number | null;
}

export interface IAssessmentResults {
    assessment: IAssessmentSummary;
    grade: IGrade;
    columns: {
    gradeSubjectId: string | null;
        key: string | null;
        name: string;
    }[]
    rows: {
        student: IStudent;
        results: Record<string, IAssessmentResultCell | null>;
        stats: {
            average: number | null;
            enteredSubjects: number;
            totalSubjects: number;
        };
    }[];
    canEnterResults: boolean;
}