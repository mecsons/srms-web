import type {IUser} from "@/modules/auth/lib/types.ts";
import type {IGradeSubject} from "@/modules/grade/lib/types.ts";

export interface ITeacher extends IUser {
    email: string;
}

export interface ITeacherAssignment {
    id: string;
    teacher: ITeacher;
    assignedSubject: IGradeSubject;
}

export interface ITeacherAssignmentSummary {
    id: string;
    teacher: ITeacher;
}