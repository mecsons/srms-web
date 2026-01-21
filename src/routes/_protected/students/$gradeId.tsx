import {z} from "zod"
import {useState} from "react";
import {Spinner} from '@/components/ui/spinner.tsx'
import {ErrorAlert} from '@/components/ui/alert.tsx'
import {Page, PageTitle} from '@/components/ui/page.tsx'
import {DataTable} from "@/components/ui/data-table.tsx";
import {SearchInput} from "@/components/ui/search-input.tsx";
import {createFileRoute, redirect} from '@tanstack/react-router'
import {getColumns} from "@/modules/student/components/columns.tsx";
import {UpsertStudent} from '@/modules/student/components/upsert-student.tsx'
import {useGetActiveStudentsByGrade} from '@/modules/student/lib/hooks/use-student-service.ts'
import {ImportStudents} from "@/modules/student/components/import-students.tsx";

const searchSchema = z.object({
    gradeName: z.string().optional(),
})

export const Route = createFileRoute('/_protected/students/$gradeId')({
    component: StudentList,
    validateSearch: (search) => searchSchema.parse(search),
    beforeLoad: ({search}) => {
        if (!search.gradeName) {
            if (window.history.length > 1) {
                window.history.back()
                return
            }

            throw redirect({to: "/"})
        }
    },
})

function StudentList() {
    const {gradeId} = Route.useParams()
    const {gradeName} = Route.useSearch()

    const [search, setSearch] = useState("");

    const {error, isPending, data: students} = useGetActiveStudentsByGrade(gradeId)

    if (isPending) return <Spinner/>
    if (error) return <ErrorAlert error={error}/>

    return (
        <Page>
            <PageTitle title={gradeName!} description={"Manage students here"}/>

            <div className="flex justify-between items-center gap-3">
                <SearchInput search={search} setSearch={setSearch}/>

                <div className="flex items-center gap-2">
                    <UpsertStudent gradeId={gradeId}/>
                    <ImportStudents gradeId={gradeId}/>
                </div>
            </div>

            <DataTable
                data={students}
                globalFilter={search}
                columns={getColumns()}
            />
        </Page>
    )
}
