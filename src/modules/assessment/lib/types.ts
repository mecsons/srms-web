import type {IUser} from "@/modules/auth/lib/types.ts";
import type {IAcademicYear} from "@/modules/academic/lib/types.ts";
import type {IGrade, IGradeSubject} from "@/modules/grade/lib/types.ts";

interface IAssessmentStats {
    scope: {
        gradeCount: number;
        subjectCount: number;
    };
}

interface IAssessmentScope {
    grade: IGrade;
    gradeSubjects: IGradeSubject[];
}

export interface IAssessmentSummary {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
}

export interface IAssessment {
    id: string;
    name: string;
    stats: IAssessmentStats;
    scope: IAssessmentScope[];
    startDate: string;
    endDate: string;
    status: "ACTIVE" | "CLOSED";
    academicYear: IAcademicYear;
    createdBy: IUser;
    createdAt: string;
    canEditAssessment: boolean;
}