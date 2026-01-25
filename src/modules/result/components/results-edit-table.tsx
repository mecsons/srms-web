import { useMemo } from "react";
import {Save} from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { FormField } from "@/components/ui/form.tsx";
import { NumberInput } from "@/components/ui/number-input.tsx";
import { getSubjectColumns } from "@/modules/result/lib/utils.tsx";
import type { IAssessmentResults } from "@/modules/result/lib/types.ts";
import { useAssessmentResultsForm } from "@/modules/result/lib/hooks/use-results-form.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSNCell } from "@/components/ui/table.tsx";

interface Props {
    results: IAssessmentResults;
}

export function ResultsEditTable({ results }: Props) {
    const { rows } = results;
    const { form, onSubmit, formIsDirty, formIsSubmitting } = useAssessmentResultsForm(results);

    const { fields } = useFieldArray({
        control: form.control,
        name: "results",
    });

    const subjectColumns = getSubjectColumns(results);

    const resultIndexMap = useMemo(() => {
        const map = new Map<string, number>();
        fields.forEach((field, index) => {
            const key = `${field.studentId}-${field.subjectId}`;
            map.set(key, index);
        });
        return map;
    }, [fields]);

    const getFieldIndex = (studentId: string, subjectId: string) => {
        return resultIndexMap.get(`${studentId}-${subjectId}`);
    };

    return (
        <form onSubmit={onSubmit}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">S/N</TableHead>
                        <TableHead>Student</TableHead>

                        {subjectColumns.map((col) => (
                            <TableHead key={col.subjectId!} className="text-center">
                                {col.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2 + subjectColumns.length}>
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
                                        const subjectId = String(col.subjectId!);
                                        const fieldIndex = getFieldIndex(studentId, subjectId);

                                        if (fieldIndex === undefined) {
                                            return (
                                                <TableCell key={subjectId} className="text-center">
                                                    -
                                                </TableCell>
                                            );
                                        }

                                        return (
                                            <TableCell key={subjectId} className="text-center">
                                                <FormField
                                                    control={form.control}
                                                    name={`results.${fieldIndex}.score`}
                                                    render={({ field }) => (
                                                        <NumberInput
                                                            {...field}
                                                            maxLength={3}
                                                            className={"text-center"}
                                                            disabled={formIsSubmitting}
                                                            value={String(field.value)}
                                                            onValueChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                            </TableCell>
                                        );
                                    })}
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

                <Button type="submit" size={"sm"}  disabled={!formIsDirty || formIsSubmitting}>
                    <Save/> {formIsSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    );
}