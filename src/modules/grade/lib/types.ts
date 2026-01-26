import type {ISubject} from "@/modules/subject/lib/types.ts";
import type {ITeacherAssignmentSummary} from "@/modules/teacher/lib/types.ts";

export interface IGrade {
    id: string
    name: string
    hierarchy: number
}

export interface IGradeSubject {
    id: string;
    subject: ISubject;
}

export interface IGradeWithSubjects extends IGrade {
    subjects: IGradeSubject[];
}

export interface IGradeDetails extends IGrade {
    stats: {
        enrolledStudentsCount: number
        assignedTeachersCount: number
        subjectsCount: number
    }
    subjects: {
        subject: IGradeSubject,
        assignedTeachers: ITeacherAssignmentSummary[]
    }[]
}