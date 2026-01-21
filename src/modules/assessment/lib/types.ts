import type {IGrade} from "@/modules/grade/lib/types.ts";
import type {ISubject} from "@/modules/subject/lib/types.ts";
import type {IAcademicYear} from "@/modules/academic/lib/types.ts";

export interface IAssessment {
    id: string;
    name: string;
    grades: IGrade[];
    subjects: ISubject[];
    startDate: string;
    endDate: string;
    status: "ACTIVE" | "CLOSED";
    academicYear: IAcademicYear;
}