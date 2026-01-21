import {FieldGroup} from "@/components/ui/field.tsx";
import {useEffect, useMemo, useState} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import type {IGradeWithSubjects} from "@/modules/grade/lib/types.ts";
import {ScopDetailsTitle} from "@/modules/assessment/components/upsert/title.tsx";
import type {AssessmentSchemaType} from "@/modules/assessment/lib/validations/assessment";
import {SubjectPanel} from "@/modules/assessment/components/upsert/scope/subject-panel.tsx";
import {GradeListItem} from "@/modules/assessment/components/upsert/scope/grade-list-item.tsx";

interface Props {
    grades: IGradeWithSubjects[]
}

export default function ScopeDetails({grades}: Props) {
    const {control, watch, formState: {errors, isSubmitting}} = useFormContext<AssessmentSchemaType>();

    const scope = watch("scope") ?? [];
    const [activeGradeId, setActiveGradeId] = useState<string | null>(scope[0]?.gradeId ?? null);

    const {append, remove, update} = useFieldArray({control, name: "scope"});

    useEffect(() => {
        if (!activeGradeId && scope.length > 0) {
            setActiveGradeId(scope[0].gradeId);
        }
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

    const toggleSubject = (gradeId: string, subjectId: string | number, checked: boolean) => {
        const sid = String(subjectId);
        const scopeIndex = scope.findIndex((entry) => entry.gradeId === gradeId);

        if (checked) {
            if (scopeIndex === -1) {
                append({ gradeId: String(gradeId), subjectIds: [sid] });
                return;
            }

            const current = scope[scopeIndex];
            if (!current.subjectIds.includes(sid)) {
                update(scopeIndex, {
                    ...current,
                    subjectIds: [...current.subjectIds, sid],
                });
            }
            return;
        }

        if (scopeIndex === -1) return;

        const current = scope[scopeIndex];
        const nextSubjectIds = current.subjectIds.filter((id) => id !== sid);

        if (nextSubjectIds.length === 0) remove(scopeIndex);
        else update(scopeIndex, { ...current, subjectIds: nextSubjectIds });
    };

    const toggleAllSubjectsForGrade = (gradeId: string, checked: boolean) => {
        const grade = grades.find((g) => g.id === gradeId);
        if (!grade) return;

        const gid = String(gradeId);
        const allIds = grade.subjects.map((s) => String(s.id));
        const scopeIndex = scope.findIndex((entry) => entry.gradeId === gid);

        if (checked) {
            if (scopeIndex === -1) append({ gradeId: gid, subjectIds: allIds });
            else update(scopeIndex, { gradeId: gid, subjectIds: allIds });
            return;
        }

        if (scopeIndex !== -1) remove(scopeIndex);
    };

    const scopeErrorMessage = (errors.scope as any)?.message;

    return (
        <div className="flex flex-col gap-6">
            <ScopDetailsTitle/>

            {scopeErrorMessage && (
                <div
                    className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {scopeErrorMessage}
                </div>
            )}

            <FieldGroup className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
                <div className="flex flex-col gap-2 pr-1">
                    {grades.map((grade) => (
                        <GradeListItem
                            key={grade.id}
                            grade={grade}
                            selectedCount={scopeByGrade.get(grade.id)?.length ?? 0}
                            isActive={activeGradeId === grade.id}
                            onClick={() => setActiveGradeId(grade.id)}
                        />
                    ))}
                </div>

                <div className="min-h-55 rounded-lg border bg-muted/30 p-4">
                    <SubjectPanel
                        grade={activeGrade}
                        selectedSubjectIds={activeSubjectIds}
                        isSubmitting={isSubmitting}
                        onToggleSubject={toggleSubject}
                        onToggleAll={toggleAllSubjectsForGrade}
                    />
                </div>
            </FieldGroup>
        </div>
    );
}