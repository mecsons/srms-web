import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx";
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {SearchInput} from "@/components/ui/search-input.tsx";
import {getColumns} from "@/modules/assessment/components/columns.tsx";
import {useGetAssessments} from "@/modules/assessment/lib/hooks/use-assessment-service.ts";
import {CreateAssessment} from "@/modules/assessment/components/assessment-actions.tsx";

export const Route = createFileRoute('/_protected/academics/assessments/')({
    component: Assessments,
})

function Assessments() {
    const [search, setSearch] = useState("");

    const {error, isPending, data: assessments} = useGetAssessments()

    if (isPending) return <Spinner/>
    if (error) return <ErrorAlert error={error}/>

    return (
        <Page>
            <PageTitle title={"Assessments"} description={"Manage assessments here"}/>

            <div className="flex justify-between items-center gap-3">
                <SearchInput search={search} setSearch={setSearch}/>
                <CreateAssessment/>
            </div>

            <DataTable
                data={assessments}
                globalFilter={search}
                columns={getColumns()}
            />
        </Page>
    )
}