import type {IGrade} from "@/modules/grade/lib/types.ts";

export interface ISubject {
    id: string;
    name: string;
}

export interface ISubjectWithGrade extends ISubject {
    grade: IGrade;
}