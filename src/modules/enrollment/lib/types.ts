import type {IStudent} from "@/modules/student/lib/types.ts";
import type {IGrade} from "@/modules/grade/lib/types.ts";

export interface IEnrollment {
    student: IStudent,
    grade: IGrade,
}