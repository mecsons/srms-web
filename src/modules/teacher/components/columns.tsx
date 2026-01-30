import {type ColumnDef} from "@tanstack/react-table";
import {TableSNCell} from "@/components/ui/table.tsx";
import type {ITeacher} from "@/modules/teacher/lib/types.ts";
import {TeacherActions} from "@/modules/teacher/components/teacher-actions.tsx";

export function getColumns() {
    const columns: ColumnDef<ITeacher>[] = [
        {
            header: "S/N",
            cell: TableSNCell,
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Username",
            accessorKey: "username",
        },
        {
            header: "Phone",
            accessorKey: "phoneNumber",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "actions",
            cell: ({row}) => <TeacherActions teacher={row.original}/>
        }
    ];

    return columns;
}
