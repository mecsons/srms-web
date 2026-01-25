import {useMemo} from "react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import type {IGradeWithSubjects, IGradeSubject} from "@/modules/grade/lib/types.ts";
import {SubjectItem} from "@/modules/assessment/components/upsert/scope/subject-item.tsx";

interface Props {
    grade: IGradeWithSubjects | null;
    selectedGradeSubjectIds: string[];
    isSubmitting: boolean;
    onToggleAll: (gradeId: string, checked: boolean) => void;
    onToggleGradeSubject: (gradeId: string, gradeSubjectId: string, checked: boolean) => void;
}

export function SubjectPanel(props: Props) {
    const {
        grade,
        selectedGradeSubjectIds,
        isSubmitting,
        onToggleGradeSubject,
        onToggleAll,
    } = props;

    const isAllChecked = useMemo(() => {
        if (!grade || grade.subjects.length === 0) return false;
        const allIds = grade.subjects.map((gs) => String(gs.id)); // GradeSubject IDs
        const selected = new Set(selectedGradeSubjectIds);
        return allIds.every((id) => selected.has(id));
    }, [grade, selectedGradeSubjectIds]);

    if (!grade) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Select a grade to view its subjects.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium">{grade.name} Subjects</div>
                    <div className="text-xs text-muted-foreground">
                        Select the subjects included in this assessment scope.
                    </div>
                </div>

                <Checkbox
                    className="size-5"
                    checked={isAllChecked}
                    disabled={isSubmitting}
                    onCheckedChange={(checked) => onToggleAll(grade.id, checked === true)}
                />
            </div>

            {grade.subjects.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                    No subjects available for this grade.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {grade.subjects.map((gradeSubject: IGradeSubject) => {
                        const gsId = String(gradeSubject.id);
                        return (
                            <SubjectItem
                                key={gsId}
                                gradeId={grade.id}
                                isDisabled={isSubmitting}
                                gradeSubject={gradeSubject}
                                onToggle={onToggleGradeSubject}
                                isChecked={selectedGradeSubjectIds.includes(gsId)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
