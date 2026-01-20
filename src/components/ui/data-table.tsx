import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DataTablePagination} from "@/components/ui/pagination.tsx";
import NotFound from "@/components/ui/not-found.tsx";

interface Props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    globalFilter?: string;
}

const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const value = row.getValue(columnId);
    if (typeof value === "string") {
        return value.toLowerCase().includes(filterValue.toLowerCase());
    }
    if (typeof value === "number") {
        return value.toString().includes(filterValue);
    }
    return false;
};

export function DataTable<TData, TValue>({...props}: Props<TData, TValue>) {
    const {columns, data, onRowClick, globalFilter} = props;

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: globalFilter ?? "",
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn,
    });

    return table.getRowModel().rows?.length ? (
        <div className="flex flex-col">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <TableHead
                                    key={index + 1}
                                    className="!font-bold"
                                    colSpan={header.colSpan}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id} data-state={row.getIsSelected() && "selected"}
                                onClick={() => onRowClick?.(row.original)}>
                                {row.getVisibleCells().map((cell, index) => (
                                    <TableCell key={index + 1}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <DataTablePagination table={table} data={data}/>
        </div>
    ) : (
        <NotFound message={"No record found"}/>
    );
}