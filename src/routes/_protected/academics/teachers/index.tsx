import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {DataTable} from "@/components/ui/data-table.tsx";
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {SearchInput} from "@/components/ui/search-input.tsx";
import {getColumns} from "@/modules/teacher/components/columns.tsx";
import {UpsertTeacher} from "@/modules/teacher/components/upsert-teacher.tsx";
import {useGetAllTeachers} from "@/modules/teacher/lib/hooks/use-teacher-service.ts";

export const Route = createFileRoute('/_protected/academics/teachers/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [search, setSearch] = useState("");

    const {error, isPending, data: teachers} = useGetAllTeachers();

    if (isPending) return <Spinner/>
    if (error) return <ErrorAlert error={error}/>

    return (
        <Page>
            <PageTitle title={"Teachers"} description={"Manage teachers here"}/>


            <div className="flex justify-between items-center gap-3">
                <SearchInput search={search} setSearch={setSearch}/>

                <div className="flex items-center gap-2">
                    <UpsertTeacher />
                </div>
            </div>

            <DataTable
                data={teachers}
                globalFilter={search}
                columns={getColumns()}
            />
        </Page>
    )
}
