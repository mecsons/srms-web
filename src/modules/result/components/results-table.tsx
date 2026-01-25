import { useMemo } from "react";
import { Save } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { FormField } from "@/components/ui/form.tsx";
import { NumberInput } from "@/components/ui/number-input.tsx";
import { formatScore, getAverageColumn, getSubjectColumns } from "@/modules/result/lib/utils.tsx";
import type { IAssessmentResults } from "@/modules/result/lib/types.ts";
import { useAssessmentResultsForm } from "@/modules/result/lib/hooks/use-results-form.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSNCell } from "@/components/ui/table.tsx";

interface Props {
    results: IAssessmentResults;
    isEditing: boolean;
}

export function ResultsTable({ results, isEditing }: Props) {
    const { rows } = results;
    const { form, onSubmit, formIsDirty, formIsSubmitting } = useAssessmentResultsForm(results);

    const { fields } = useFieldArray({
        control: form.control,
        name: "results",
    });

    const subjectColumns = getSubjectColumns(results);
    const averageColumn = getAverageColumn(results);

    const resultIndexMap = useMemo(() => {
        const map = new Map<string, number>();
        fields.forEach((field, index) => {
            const key = `${field.studentId}-${field.gradeSubjectId}`;
            map.set(key, index);
        });
        return map;
    }, [fields]);

    const getFieldIndex = (studentId: string, gradeSubjectId: string) => {
        return resultIndexMap.get(`${studentId}-${gradeSubjectId}`);
    };

    const content = (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">S/N</TableHead>
                        <TableHead>Student</TableHead>

                        {subjectColumns.map((col) => (
                            <TableHead key={col.gradeSubjectId!} className="text-center">
                                {col.name}
                            </TableHead>
                        ))}

                        {!isEditing && averageColumn && (
                            <TableHead className="text-center">{averageColumn.name}</TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2 + subjectColumns.length + (averageColumn && !isEditing ? 1 : 0)}>
                                No students found for this grade.
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, index) => {
                            const studentId = String(row.student.id);

                            return (
                                <TableRow key={studentId}>
                                    <TableCell>
                                        <TableSNCell index={index} />
                                    </TableCell>

                                    <TableCell className="font-medium">{row.student.name}</TableCell>

                                    {subjectColumns.map((col) => {
                                        const gradeSubjectId = String(col.gradeSubjectId!);

                                        if (isEditing) {
                                            const fieldIndex = getFieldIndex(studentId, gradeSubjectId);

                                            if (fieldIndex === undefined) {
                                                return (
                                                    <TableCell key={gradeSubjectId} className="text-center">
                                                        -
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell key={gradeSubjectId} className="text-center">
                                                    <FormField
                                                        control={form.control}
                                                        name={`results.${fieldIndex}.score`}
                                                        render={({ field }) => (
                                                            <NumberInput
                                                                {...field}
                                                                maxLength={3}
                                                                className="text-center"
                                                                disabled={formIsSubmitting}
                                                                value={String(field.value)}
                                                                onValueChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                </TableCell>
                                            );
                                        } else {
                                            const cell = row.results?.[gradeSubjectId] ?? null;
                                            const score = cell?.score ?? null;

                                            return (
                                                <TableCell key={gradeSubjectId} className="text-center tabular-nums">
                                                    {formatScore(score)}
                                                </TableCell>
                                            );
                                        }
                                    })}

                                    {!isEditing && averageColumn && (
                                        <TableCell className="text-center tabular-nums font-medium">
                                            {formatScore(row.stats?.average ?? null)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="text-sm text-muted-foreground">
                    Showing {results.rows.length} records
                </div>

                {isEditing && (
                    <Button type="submit" size="sm" disabled={!formIsDirty || formIsSubmitting}>
                        <Save /> {formIsSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                )}
            </div>
        </>
    );

    return isEditing ? <form onSubmit={onSubmit}>{content}</form> : <div>{content}</div>;
}