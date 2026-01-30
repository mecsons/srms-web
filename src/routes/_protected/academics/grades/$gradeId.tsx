import {Spinner} from "@/components/ui/spinner.tsx";
import {ErrorAlert} from "@/components/ui/alert.tsx"
import {CardTitle} from "@/components/ui/card.tsx";
import {createFileRoute} from '@tanstack/react-router'
import {StatCard} from "@/components/ui/stat-card.tsx";
import {Page, PageTitle} from "@/components/ui/page.tsx";
import {useHasAnyRole} from "@/modules/auth/lib/hooks/use-auth.ts";
import {useGetGrade} from "@/modules/grade/lib/hooks/use-grade-service.ts";
import {useGetAllTeachers} from "@/modules/teacher/lib/hooks/use-teacher-service.ts";
import {AssignSubjectTeachers} from "@/modules/teacher/components/assign-subject-teachers.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSNCell} from "@/components/ui/table.tsx";

export const Route = createFileRoute('/_protected/academics/grades/$gradeId')({
    component: GradeDetails,
})

function GradeDetails() {
    const {gradeId} = Route.useParams()
    const canAssignTeachers = useHasAnyRole(["ROLE_ACADEMIC_ADMIN"]);

    const {error, isPending, data: gradeDetails} = useGetGrade(gradeId);
    const {error: teachersError, isPending: teachersPending, data: allTeachers} = useGetAllTeachers();

    if (isPending || teachersPending) return <Spinner/>;
    if (error) return <ErrorAlert error={error}/>;
    if (teachersError) return <ErrorAlert error={teachersError}/>;

    const {name: gradeName, stats, subjects} = gradeDetails;

    return (
        <Page>
            <PageTitle title={gradeName!}/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <StatCard title={"Students"} value={stats.enrolledStudentsCount}/>
                <StatCard title={"Subjects"} value={stats.subjectsCount}/>
                <StatCard title={"Assigned Teachers"} value={stats.assignedTeachersCount}/>
            </div>

            <CardTitle>Subjects</CardTitle>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">S/N</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Assigned Teachers</TableHead>
                        {canAssignTeachers && <TableHead className="w-20"></TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {subjects.length ? (
                        subjects.map(({subject, assignedTeachers}, index) => (
                            <TableRow key={subject.id}>
                                <TableCell>
                                    <TableSNCell index={index}/>
                                </TableCell>

                                <TableCell className="font-medium">
                                    {subject.subject.name}
                                </TableCell>

                                <TableCell>
                                    {assignedTeachers.length
                                        ? assignedTeachers.map((t) => t.teacher.name).join(", ")
                                        : "No teacher assigned"}
                                </TableCell>

                                {canAssignTeachers && (
                                    <TableCell>
                                        <div className="ml-2 sm:ml-0">
                                            <AssignSubjectTeachers
                                                gradeSubject={subject}
                                                allTeachers={allTeachers}
                                                assignedTeachers={assignedTeachers}
                                            />
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                                No subjects assigned to this grade.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Page>
    )
}
