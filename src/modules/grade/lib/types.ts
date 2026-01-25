import type {ISubject} from "@/modules/subject/lib/types.ts";

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