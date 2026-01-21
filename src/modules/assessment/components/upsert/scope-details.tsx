import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useEffect, useMemo, useState} from "react";
import {FieldGroup} from "@/components/ui/field.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useFieldArray, useFormContext} from "react-hook-form";
import type {IGradeWithSubjects} from "@/modules/grade/lib/types.ts";
import {ScopDetailsTitle} from "@/modules/assessment/components/upsert/title.tsx";
import type {AssessmentSchemaType} from "@/modules/assessment/lib/validations/assessment";

interface Props {
    grades: IGradeWithSubjects[]
}

export function ScopeDetails({grades}: Props) {
    const {control, watch, formState: {isSubmitting}} = useFormContext<AssessmentSchemaType>();

    const scope = watch("scope") ?? [];
    const [activeGradeId, setActiveGradeId] = useState<string | null>(scope[0]?.gradeId ?? null);

    const {append, remove, update} = useFieldArray({control, name: "scope"});

    useEffect(() => {
        if (!activeGradeId && scope.length > 0) {
            setActiveGradeId(scope[0].gradeId);
        }

        // optional: if scope is empty but grades exist, default to first grade
        // if (!activeGradeId && scope.length === 0 && grades.length > 0) {
        //     setActiveGradeId(grades[0].id);
        // }
    }, [activeGradeId, scope]);

    const scopeByGrade = useMemo(() => {
        const map = new Map<string, string[]>();
        scope.forEach((entry) => {
            map.set(entry.gradeId, entry.subjectIds);
        });
        return map;
    }, [scope]);

    const activeGrade = grades.find((grade) => grade.id === activeGradeId) ?? null;
    const activeSubjectIds = activeGrade ? scopeByGrade.get(activeGrade.id) ?? [] : [];

    const toggleSubject = (gradeId: string, subjectId: string, checked: boolean) => {
        const scopeIndex = scope.findIndex((entry) => entry.gradeId === gradeId);

        if (checked) {
            if (scopeIndex === -1) {
                append({gradeId, subjectIds: [subjectId]});
                return;
            }

            const current = scope[scopeIndex];
            if (!current.subjectIds.includes(subjectId)) {
                update(scopeIndex, {
                    ...current,
                    subjectIds: [...current.subjectIds, subjectId],
                });
            }
            return;
        }

        if (scopeIndex === -1) return;

        const current = scope[scopeIndex];
        const nextSubjectIds = current.subjectIds.filter((id) => id !== subjectId);

        if (nextSubjectIds.length === 0) {
            remove(scopeIndex);
        } else {
            update(scopeIndex, {
                ...current,
                subjectIds: nextSubjectIds,
            });
        }
    };

    const toggleAllSubjectsForGrade = (gradeId: string, checked: boolean) => {
        const grade = grades.find((g) => g.id === gradeId);
        if (!grade) return;

        const allIds = grade.subjects.map((s) => s.id);
        const scopeIndex = scope.findIndex((entry) => entry.gradeId === gradeId);

        if (checked) {
            if (scopeIndex === -1) {
                append({gradeId, subjectIds: allIds});
            } else {
                update(scopeIndex, {gradeId, subjectIds: allIds});
            }
            return;
        }

        if (scopeIndex !== -1) remove(scopeIndex);
    };

    const isAllChecked = useMemo(() => {
        if (!activeGrade) return false;
        const allIds = activeGrade.subjects.map((s) => s.id);
        if (allIds.length === 0) return false;

        const selected = new Set(activeSubjectIds);
        return allIds.every((id) => selected.has(id));
    }, [activeGrade, activeSubjectIds]);


    return (
        <div className="flex flex-col gap-6">
            <ScopDetailsTitle/>

            <FieldGroup className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
                <div className="flex max-h-105 flex-col gap-2 overflow-y-auto pr-1">
                    {grades.map((grade) => {
                        const selectedCount = scopeByGrade.get(grade.id)?.length ?? 0;
                        const isActive = activeGradeId === grade.id;

                        return (
                            <button
                                key={grade.id}
                                type="button"
                                onClick={() => setActiveGradeId(grade.id)}
                                className={cn(
                                    "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                                    "hover:border-primary/50 hover:bg-muted",
                                    isActive && "border-primary bg-primary/5"
                                )}
                            >
                                <span className="truncate">{grade.name}</span>
                                <Badge variant={selectedCount > 0 ? "default" : "secondary"}>
                                    {selectedCount}
                                </Badge>
                            </button>
                        );
                    })}
                </div>

                <div className="min-h-55 rounded-lg border bg-muted/30 p-4">
                    {!activeGrade && (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            Select a grade to view its subjects.
                        </div>
                    )}

                    {activeGrade && (
                        <div className="flex flex-col gap-4">
                            <div className={"flex justify-between items-center"}>
                                <div>
                                    <div className="text-sm font-medium">{activeGrade.name} Subjects</div>
                                    <div className="text-xs text-muted-foreground">
                                        Select the subjects included in this assessment scope.
                                    </div>
                                </div>

                                <Checkbox
                                    className={"size-5"}
                                    checked={isAllChecked}
                                    disabled={isSubmitting}
                                    onCheckedChange={(checked) =>
                                        toggleAllSubjectsForGrade(activeGrade.id, checked === true)
                                    }
                                />
                            </div>

                            {activeGrade.subjects.length === 0 ? (
                                <div className="text-sm text-muted-foreground">
                                    No subjects available for this grade.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {activeGrade.subjects.map((subject) => {
                                        const isChecked = activeSubjectIds.includes(subject.id);
                                        const checkboxId = `scope-${activeGrade.id}-${subject.id}`;

                                        return (
                                            <Label
                                                key={subject.id}
                                                htmlFor={checkboxId}
                                                className={cn(
                                                    "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                                                    "hover:border-primary/50 hover:bg-background",
                                                    isChecked && "border-primary bg-primary/5"
                                                )}
                                            >
                                                <Checkbox
                                                    id={checkboxId}
                                                    checked={isChecked}
                                                    disabled={isSubmitting}
                                                    onCheckedChange={(checked) =>
                                                        toggleSubject(
                                                            activeGrade.id,
                                                            subject.id,
                                                            checked === true
                                                        )
                                                    }
                                                />
                                                <span className="truncate">{subject.name}</span>
                                            </Label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </FieldGroup>
        </div>
    );
}