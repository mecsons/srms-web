interface ISubjectInGrade {
  id: string;
  name: string;
}

export interface IGrade {
    id: string
    name: string
    hierarchy: number
}

export interface IGradeWithSubjects extends IGrade {
  subjects: ISubjectInGrade[];
}