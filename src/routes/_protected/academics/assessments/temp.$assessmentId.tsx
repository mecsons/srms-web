import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/ui/page.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Download,
    EllipsisVertical,
    FileDown,
    FileUp,
    Pencil,
    SlidersHorizontal,
} from "lucide-react";
import {cn} from "@/lib/utils.ts";

export const Route = createFileRoute("/_protected/academics/assessments/temp/$assessmentId")({
    component: RouteComponent,
});

function statusBadgeVariant(status?: string) {
    const s = (status ?? "").toUpperCase();
    if (s === "ONGOING") return "default";
    if (s === "DRAFT") return "secondary";
    if (s === "COMPLETED") return "outline";
    return "secondary";
}

// -------------------------------------------------------------
// Types (frontend-friendly)
// -------------------------------------------------------------
type SubjectChip = { id: string; name: string };
type ScopeRow = { gradeId: string; gradeName: string; subjects: SubjectChip[] };

type AssessmentForUI = {
    id: string;
    name: string;
    status: "DRAFT" | "ONGOING" | "COMPLETED" | string;
    startDate: string;
    endDate: string;
    academicYear?: { name?: string } | string;
    createdBy?: { name?: string; avatarUrl?: string };
    createdAt?: string;
    scope: ScopeRow[];
    resultsCoverage?: { entered: number; total: number };
};

// -------------------------------------------------------------
// Dummy fallback (until your backend endpoint returns everything)
// -------------------------------------------------------------
const FALLBACK_ASSESSMENT: AssessmentForUI = {
    id: "1",
    name: "Midterm Exams",
    status: "ONGOING",
    startDate: "2026-01-15",
    endDate: "2026-01-29",
    academicYear: { name: "2025" },
    createdBy: { name: "Ringo Ebenezer" },
    createdAt: "2026-01-10T09:22:00",
    scope: [
        {
            gradeId: "1",
            gradeName: "Grade 1",
            subjects: [
                { id: "m1", name: "Mathematics" },
                { id: "e1", name: "English" },
                { id: "s1", name: "Science" },
                { id: "c1", name: "Civics" },
            ],
        },
        {
            gradeId: "2",
            gradeName: "Grade 2",
            subjects: [
                { id: "m2", name: "Mathematics" },
                { id: "e2", name: "English" },
                { id: "i2", name: "ICT" },
                { id: "g2", name: "Geography" },
            ],
        },
        {
            gradeId: "3",
            gradeName: "Grade 3",
            subjects: [
                { id: "m3", name: "Mathematics" },
                { id: "e3", name: "English" },
                { id: "s3", name: "Science" },
                { id: "h3", name: "History" },
                { id: "k3", name: "Kiswahili" },
            ],
        },
    ],
    resultsCoverage: { entered: 412, total: 520 },
};

// Results dummy table (Grade 2 selected)
type StudentRow = {
    id: string;
    studentName: string;
    admissionNo: string;
    scores: Record<string, number | null>; // null = missing
};

const GRADE2_SUBJECTS = ["Mathematics", "English", "ICT", "Geography"] as const;

const FALLBACK_GRADE2_ROWS: StudentRow[] = [
    { id: "st1", studentName: "Daniel Smith", admissionNo: "1201", scores: { Mathematics: 85, English: 78, ICT: 92, Geography: 83 } },
    { id: "st2", studentName: "Jessica Patel", admissionNo: "1204", scores: { Mathematics: 92, English: 81, ICT: null, Geography: null } },
    { id: "st3", studentName: "Alex Johnson", admissionNo: "1187", scores: { Mathematics: 76, English: 64, ICT: 79, Geography: 45 } },
    { id: "st4", studentName: "Liam O'Reilly", admissionNo: "1220", scores: { Mathematics: 88, English: 89, ICT: 94, Geography: 90 } },
    { id: "st5", studentName: "Rachel Kim", admissionNo: "1198", scores: { Mathematics: 90, English: 85, ICT: 81, Geography: null } },
    { id: "st6", studentName: "Ethan Carter", admissionNo: "1215", scores: { Mathematics: 68, English: 72, ICT: 74, Geography: 63 } },
    { id: "st7", studentName: "Grace Huang", admissionNo: "1175", scores: { Mathematics: 95, English: 98, ICT: 96, Geography: 91 } },
    { id: "st8", studentName: "Noah Mbwana", admissionNo: "1231", scores: { Mathematics: 54, English: 59, ICT: null, Geography: 61 } },
];

function calcAverage(scores: Record<string, number | null>) {
    const vals = Object.values(scores).filter((v): v is number => typeof v === "number");
    if (!vals.length) return null;
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round((sum / vals.length) * 10) / 10;
}

function RouteComponent() {
    const { assessmentId } = Route.useParams();

    const assessment: AssessmentForUI = React.useMemo(() => {
        return {
            ...FALLBACK_ASSESSMENT,
            id: String(assessmentId),
        };
    }, [assessmentId]);

    // Results UI state (dummy now; wire to endpoints later)
    const [tab, setTab] = React.useState<"overview" | "results">("overview");
    const [selectedGrade, setSelectedGrade] = React.useState<string>("Grade 2");
    const [selectedSubject, setSelectedSubject] = React.useState<string>("All subjects");
    const [search, setSearch] = React.useState("");
    const [filterMissing, setFilterMissing] = React.useState(false);
    const [filterBelowPass, setFilterBelowPass] = React.useState(false);

    const [rows, setRows] = React.useState<StudentRow[]>(FALLBACK_GRADE2_ROWS);
    const [dirty, setDirty] = React.useState(false);

    const grade2Subjects = React.useMemo(() => [...GRADE2_SUBJECTS], []);

    const filteredRows = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        return rows.filter((r) => {
            const matchSearch =
                !q ||
                r.studentName.toLowerCase().includes(q) ||
                r.admissionNo.toLowerCase().includes(q);

            const hasMissing = Object.values(r.scores).some((v) => v == null);
            const avg = calcAverage(r.scores);
            const below = avg != null && avg < 50;

            const matchMissing = !filterMissing || hasMissing;
            const matchBelow = !filterBelowPass || below;

            return matchSearch && matchMissing && matchBelow;
        });
    }, [rows, search, filterMissing, filterBelowPass]);

    const kpis = React.useMemo(() => {
        const students = rows.length;
        const subjects = grade2Subjects.length;
        const entered = rows.reduce((acc, r) => acc + Object.values(r.scores).filter((v) => typeof v === "number").length, 0);
        const total = students * subjects;
        const averages = rows.map((r) => calcAverage(r.scores)).filter((v): v is number => typeof v === "number");
        const classAvg =
            averages.length ? Math.round((averages.reduce((a, b) => a + b, 0) / averages.length) * 10) / 10 : 0;
        return { students, subjects, entered, total, classAvg };
    }, [rows, grade2Subjects.length]);

    function updateScore(studentId: string, subject: string, value: string) {
        const num = value.trim() === "" ? null : Number(value);
        if (num !== null && (Number.isNaN(num) || num < 0 || num > 100)) return;

        setRows((prev) =>
            prev.map((r) =>
                r.id === studentId
                    ? { ...r, scores: { ...r.scores, [subject]: num } }
                    : r
            )
        );
        setDirty(true);
    }

    function saveChanges() {
        setDirty(false);
    }

    function discardChanges() {
        setRows(FALLBACK_GRADE2_ROWS);
        setDirty(false);
    }

    return (
        <Page>
            <div className="mx-auto w-full max-w-360 px-6 py-6">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold tracking-tight">{assessment.name}</h1>
                            <Badge variant={statusBadgeVariant(assessment.status)} className="rounded-full">
                                {(assessment.status ?? "").toUpperCase()}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    // TODO: route to edit page if you have it
                                    // navigate({ to: `...` })
                                }}
                            >
                                Edit
                            </Button>

                            <Button variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Export
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label="More actions">
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => setTab("results")}>Go to Results</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTab("overview")}>Go to Overview</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="results">Results</TabsTrigger>
                        </TabsList>

                        {/* OVERVIEW */}
                        <TabsContent value="overview" className="mt-6">
                        </TabsContent>

                        {/* RESULTS */}
                        <TabsContent value="results" className="mt-6">
                            <Card className="rounded-xl">
                                <CardHeader className="space-y-4">
                                    {/* Toolbar */}
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {assessment.scope.map((g) => (
                                                        <SelectItem key={g.gradeId} value={g.gradeName}>
                                                            {g.gradeName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                                <SelectTrigger className="w-[220px]">
                                                    <SelectValue placeholder="Select subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="All subjects">All subjects</SelectItem>
                                                    {grade2Subjects.map((s) => (
                                                        <SelectItem key={s} value={s}>
                                                            {s}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <div className="relative w-full md:w-[280px]">
                                                <Input
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    placeholder="Search student..."
                                                    className="pl-10"
                                                />
                                                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant={filterMissing ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setFilterMissing((v) => !v)}
                                                    className="rounded-full"
                                                >
                                                    Missing scores
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={filterBelowPass ? "destructive" : "outline"}
                                                    size="sm"
                                                    onClick={() => setFilterBelowPass((v) => !v)}
                                                    className="rounded-full"
                                                >
                                                    Below pass mark
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <Button variant="outline">
                                                <FileUp className="mr-2 h-4 w-4" />
                                                Import Excel
                                            </Button>
                                            <Button variant="outline">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Template
                                            </Button>
                                            <Button variant="outline">
                                                <FileDown className="mr-2 h-4 w-4" />
                                                Export
                                            </Button>
                                        </div>
                                    </div>

                                    {/* KPI Row */}
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        <div className="rounded-xl border bg-background p-3">
                                            <div className="text-xs text-muted-foreground">Students</div>
                                            <div className="mt-1 text-lg font-semibold">{kpis.students}</div>
                                        </div>
                                        <div className="rounded-xl border bg-background p-3">
                                            <div className="text-xs text-muted-foreground">Subjects</div>
                                            <div className="mt-1 text-lg font-semibold">{kpis.subjects}</div>
                                        </div>
                                        <div className="rounded-xl border bg-background p-3">
                                            <div className="text-xs text-muted-foreground">Scores Entered</div>
                                            <div className="mt-1 text-lg font-semibold">
                                                {kpis.entered}/{kpis.total}
                                            </div>
                                        </div>
                                        <div className="rounded-xl border bg-background p-3">
                                            <div className="text-xs text-muted-foreground">Class Average</div>
                                            <div className="mt-1 text-lg font-semibold">{kpis.classAvg}</div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {/* Table */}
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-55">Student</TableHead>
                                                    <TableHead className="w-40">Admission No.</TableHead>
                                                    {grade2Subjects.map((subject) => (
                                                        <TableHead key={subject} className="min-w-35">
                                                            <div className="flex items-center gap-2">
                                                                {subject}
                                                            </div>
                                                        </TableHead>
                                                    ))}
                                                    <TableHead className="w-30">Average</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {filteredRows.map((r) => {
                                                    const avg = calcAverage(r.scores);

                                                    return (
                                                        <TableRow key={r.id} className="hover:bg-muted/40">
                                                            <TableCell className="font-medium">{r.studentName}</TableCell>
                                                            <TableCell className="text-muted-foreground">{r.admissionNo}</TableCell>

                                                            {grade2Subjects.map((subject) => {
                                                                const val = r.scores[subject];
                                                                const isMissing = val == null;

                                                                return (
                                                                    <TableCell key={`${r.id}-${subject}`}>
                                                                        <div className="group relative">
                                                                            <Input
                                                                                value={val == null ? "" : String(val)}
                                                                                onChange={(e) => updateScore(r.id, subject, e.target.value)}
                                                                                placeholder={isMissing ? "—" : ""}
                                                                                className={cn(
                                                                                    "h-9 w-24 text-center",
                                                                                    isMissing && "text-muted-foreground",
                                                                                    "pr-8"
                                                                                )}
                                                                            />
                                                                            <Pencil className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                                                        </div>
                                                                    </TableCell>
                                                                );
                                                            })}

                                                            <TableCell className="font-medium">
                                                                {avg == null ? "—" : avg.toFixed(1)}
                                                            </TableCell>

                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>

                                    {/* Sticky bottom bar */}
                                    <div
                                        className={cn(
                                            "mt-4 flex items-center justify-between gap-3 rounded-xl border bg-background p-3 shadow-sm",
                                            "sticky bottom-4"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 text-sm">
                      <span
                          className={cn(
                              "inline-flex h-2 w-2 rounded-full",
                              dirty ? "bg-amber-500" : "bg-emerald-500"
                          )}
                      />
                                            <span className="font-medium">
                        {dirty ? "Unsaved changes" : "All changes saved"}
                      </span>
                                            <span className="text-muted-foreground">
                        {dirty ? "Review and save your edits." : "You're up to date."}
                      </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={discardChanges}
                                                disabled={!dirty}
                                            >
                                                Discard
                                            </Button>
                                            <Button onClick={saveChanges} disabled={!dirty}>
                                                Save changes
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </Page>
    );
}