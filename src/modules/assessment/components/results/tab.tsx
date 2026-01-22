import {StatCard} from "@/components/ui/stat-card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSNCell} from "@/components/ui/table.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Pencil} from "lucide-react";
import * as React from "react";

export function ResultsTab() {
    type StudentRow = {
        id: string;
        studentName: string;
        admissionNo: string;
        scores: Record<string, number | null>;
    };

    const FALLBACK_GRADE2_ROWS: StudentRow[] = [
        {
            id: "st1",
            studentName: "Daniel Smith",
            admissionNo: "1201",
            scores: {Mathematics: 85, English: 78, ICT: 92, Geography: 83}
        },
        {
            id: "st2",
            studentName: "Jessica Patel",
            admissionNo: "1204",
            scores: {Mathematics: 92, English: 81, ICT: null, Geography: null}
        },
        {
            id: "st3",
            studentName: "Alex Johnson",
            admissionNo: "1187",
            scores: {Mathematics: 76, English: 64, ICT: 79, Geography: 45}
        },
        {
            id: "st4",
            studentName: "Liam O'Reilly",
            admissionNo: "1220",
            scores: {Mathematics: 88, English: 89, ICT: 94, Geography: 90}
        },
        {
            id: "st5",
            studentName: "Rachel Kim",
            admissionNo: "1198",
            scores: {Mathematics: 90, English: 85, ICT: 81, Geography: null}
        },
        {
            id: "st6",
            studentName: "Ethan Carter",
            admissionNo: "1215",
            scores: {Mathematics: 68, English: 72, ICT: 74, Geography: 63}
        },
        {
            id: "st7",
            studentName: "Grace Huang",
            admissionNo: "1175",
            scores: {Mathematics: 95, English: 98, ICT: 96, Geography: 91}
        },
        {
            id: "st8",
            studentName: "Noah Mbwana",
            admissionNo: "1231",
            scores: {Mathematics: 54, English: 59, ICT: null, Geography: 61}
        },
    ];

    const GRADE2_SUBJECTS = ["Mathematics", "English", "ICT", "Geography"] as const;
    const grade2Subjects = React.useMemo(() => [...GRADE2_SUBJECTS], []);

    return (
        <div className={"flex flex-col gap-7"}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard title={"Students"} value={"20"}/>
                <StatCard title={"Subjects"} value={"8"}/>
                <StatCard title={"Scores Entered"} value={"28/32"}/>
                <StatCard title={"Overall Average"} value={"77.4"}/>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">S/N</TableHead>
                        <TableHead className="w-43">Student</TableHead>
                        <TableHead className="w-40">Admission No.</TableHead>
                        {grade2Subjects.map((subject) => (
                            <TableHead key={subject} className="min-w-35">
                                <div className="flex items-center gap-2">
                                    {subject}
                                </div>
                            </TableHead>
                        ))}
                        <TableHead className="w-30">Avg.</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {FALLBACK_GRADE2_ROWS.map((r, index) => {
                        return (
                            <TableRow key={r.id} className="hover:bg-muted/40">
                                <TableCell>
                                    <TableSNCell index={index}/>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {r.studentName}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    MEC-2025-8120
                                </TableCell>

                                {grade2Subjects.map((subject) => {
                                    const val = r.scores[subject];
                                    const isMissing = val == null;

                                    return (
                                        <TableCell key={`${r.id}-${subject}`}>
                                            <div className="group relative">
                                                <Input
                                                    value={val == null ? "" : String(val)}
                                                    placeholder={isMissing ? "—" : ""}
                                                    className={cn(
                                                        "h-9 w-24 text-center",
                                                        isMissing && "text-muted-foreground",
                                                        "pr-8"
                                                    )}
                                                />

                                                <Pencil
                                                    className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"/>
                                            </div>
                                        </TableCell>
                                    );
                                })}

                                <TableCell className="font-medium pl-3">
                                    80
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}