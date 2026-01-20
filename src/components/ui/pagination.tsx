import * as React from "react"
import {cn} from "@/lib/utils"
import {type Table} from "@tanstack/react-table";
import {Button, buttonVariants} from "@/components/ui/button"
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon} from "lucide-react"

function Pagination({className, ...props}: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    )
}

function PaginationContent({
                               className,
                               ...props
                           }: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex flex-row items-center gap-1", className)}
            {...props}
        />
    )
}

function PaginationItem({...props}: React.ComponentProps<"li">) {
    return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">

function PaginationLink({
                            className,
                            isActive,
                            size = "icon",
                            ...props
                        }: PaginationLinkProps) {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? "outline" : "ghost",
                    size,
                }),
                className
            )}
            {...props}
        />
    )
}

function PaginationPrevious({
                                className,
                                ...props
                            }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronLeftIcon/>
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    )
}

function PaginationNext({
                            className,
                            ...props
                        }: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon/>
        </PaginationLink>
    )
}

function PaginationEllipsis({
                                className,
                                ...props
                            }: React.ComponentProps<"span">) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
        >
      <MoreHorizontalIcon className="size-4"/>
      <span className="sr-only">More pages</span>
    </span>
    )
}

interface DataTablePaginationProps<TData> {
    data: TData[]
    table: Table<TData>;
}

function DataTablePagination<TData>({data, table}: DataTablePaginationProps<TData>) {
    const totalRecords = data.length
    const pageSize = table.getState().pagination.pageSize
    const pageIndex = table.getState().pagination.pageIndex
    const totalPages = Math.ceil(totalRecords / pageSize)

    const start = totalRecords > 0 ? pageIndex * pageSize + 1 : 0
    const end = Math.min((pageIndex + 1) * pageSize, totalRecords)

    return totalRecords > 0 ? (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3  py-4">
            {/* Left side text */}
            <div className="text-sm text-muted-foreground">
                Showing {start} to {end} of {totalRecords} items | Page {pageIndex + 1} of {totalPages}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center space-x-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeftIcon className="h-4 w-4"/>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="h-4 w-4"/>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className="h-4 w-4"/>
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRightIcon className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    ) : null
}

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
    DataTablePagination
}
