import {formatDateString} from "@/lib/utils.ts";
import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {getStatusBadge} from "@/modules/assessment/lib/utils.tsx";

export function getColumns(): ColumnDef<IAssessment>[] {
    return [
        {
            header: "S/N",
            cell: TableSNCell,
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Year",
            accessorKey: "academicYear.name",
        },
        {
            header: "Grades",
            cell: ({row}) => {
                return (
                    <span>
                       {row.original.grades.length} Grade(s)
                    </span>
                );
            },
        },
        {
            header: "Subjects",
            cell: ({row}) => (
                <span>
                    {row.original.subjects.length} Subject(s)
                </span>
            ),
        },
        {
            header: "Start Date",
            cell: ({row}) => formatDateString(row.original.startDate)
        },
        {
            header: "End Date",
            cell: ({row}) => formatDateString(row.original.endDate)
        },
        {
            header: "Status",
            cell: ({row}) => getStatusBadge(row.original)
        },
    ];
}
