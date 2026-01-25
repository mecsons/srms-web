import {formatDateString} from "@/lib/utils.ts";
import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import {getStatusBadge} from "@/modules/assessment/lib/utils.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {AssessmentActions} from "@/modules/assessment/components/assessment-actions.tsx";

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
            header: "Created By",
            cell: ({row}) => formatDateString(row.original.endDate)
        },
        {
            header: "Created By",
            cell: ({row}) => {
                const {createdBy: {name}, createdAt} = row.original;

                return (
                    <div className="flex flex-col">
                        <span>{name}</span>
                        <span className="text-muted-foreground text-sm">
                            {formatDateString(createdAt, {showTimestamp: true})}
                        </span>
                    </div>
                );
            },
        },
        {
            header: "Status",
            cell: ({row}) => getStatusBadge(row.original)
        },
        {
            id: "actions",
            cell: ({row}) => <AssessmentActions assessment={row.original}/>
        }
    ];
}
