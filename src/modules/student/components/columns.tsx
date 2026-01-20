import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import type {IStudent} from "@/modules/student/lib/types.ts";

export function getColumns() {
    const columns: ColumnDef<IStudent>[] = [
        {
            header: "S/N",
            cell: TableSNCell,
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Admission No.",
            accessorKey: "admissionNumber",
        },
        {
            header: "Phone",
            accessorKey: "phoneNumber",
        },
    ];

    return columns;
}
