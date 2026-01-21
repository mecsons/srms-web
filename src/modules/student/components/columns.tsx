import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import type {IEnrollment} from "@/modules/enrollment/lib/types.ts";
import {StudentActions} from "@/modules/student/components/student-actions.tsx";

export function getColumns() {
    const columns: ColumnDef<IEnrollment>[] = [
        {
            header: "S/N",
            cell: TableSNCell,
        },
        {
            header: "Name",
            accessorKey: "student.name",
        },
        {
            header: "Admission No.",
            accessorKey: "student.admissionNumber",
        },
        {
            header: "Phone",
            accessorKey: "student.phoneNumber",
        },
        {
            id: "actions",
            cell: ({row}) => <StudentActions enrollment={row.original}/>
        }
    ];

    return columns;
}
