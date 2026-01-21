import {formatDateString} from "@/lib/utils.ts";
import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import {getStatusBadge} from "@/modules/assessment/lib/utils.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";

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
