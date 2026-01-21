import type {IGrade} from "@/modules/grade/lib/types.ts";
import type {ISubject} from "@/modules/subject/lib/types.ts";
import type {IAcademicYear} from "@/modules/academic/lib/types.ts";
import type {IUser} from "@/modules/auth/lib/types.ts";

export interface IAssessmentScope {
    grade: IGrade;
    subjects: ISubject[]
}

export interface IAssessment {
    id: string;
    name: string;
    scope: IAssessmentScope[];
    startDate: string;
    endDate: string;
    status: "ACTIVE" | "CLOSED";
    academicYear: IAcademicYear;
    createdBy: IUser;
    createdAt: string;
}