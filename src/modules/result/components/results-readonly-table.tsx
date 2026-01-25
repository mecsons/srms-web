import type {IAssessmentResults} from "@/modules/result/lib/types.ts";
import {formatScore, getAverageColumn, getSubjectColumns} from "@/modules/result/lib/utils.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSNCell} from "@/components/ui/table.tsx";

interface Props {
    results: IAssessmentResults;
}

export function ResultsReadonlyTable({results}: Props) {
    const {rows} = results;

    const subjectColumns = getSubjectColumns(results);
    const averageColumn = getAverageColumn(results);

    return (
        <div>
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

                        {averageColumn && (
                            <TableHead className="text-center">{averageColumn.name}</TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4 + subjectColumns.length}>
                                No students found for this grade.
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row, index) => {

                            return (
                                <TableRow key={row.student.id}>
                                    <TableCell>
                                        <TableSNCell index={index}/>
                                    </TableCell>

                                    <TableCell className="font-medium">{row.student.name}</TableCell>

                                    {subjectColumns.map((col) => {
                                        const subjectId = col.subjectId!;
                                        const cell = row.results?.[subjectId] ?? null;
                                        const score = cell?.score ?? null;

                                        return (
                                            <TableCell key={subjectId} className="text-center tabular-nums">
                                                {formatScore(score)}
                                            </TableCell>
                                        );
                                    })}

                                    {averageColumn && (
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

            <div className="mt-4 text-sm text-muted-foreground">
                Showing {results.rows.length} records
            </div>
        </div>
    )
}