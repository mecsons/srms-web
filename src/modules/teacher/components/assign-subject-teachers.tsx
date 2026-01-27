import {useMemo, useState} from "react";
import type {IGradeSubject} from "@/modules/grade/lib/types";
import type {ITeacher, ITeacherAssignmentSummary} from "@/modules/teacher/lib/types";
import {FormField} from "@/components/ui/form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {FilePen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {FieldGroup} from "@/components/ui/field.tsx";
import {SearchInput} from "@/components/ui/search-input.tsx";
import {useAssignSubjectTeachersForm} from "@/modules/teacher/lib/hooks/use-assign-subject-teachers-form";

interface Props {
    gradeSubject: IGradeSubject;
    assignedTeachers: ITeacherAssignmentSummary[];
    allTeachers: ITeacher[];
}

export function AssignSubjectTeachers({gradeSubject, assignedTeachers, allTeachers}: Props) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const {
        form,
        selectedCount,
        formIsDirty,
        formIsSubmitting,
        onSubmit
    } = useAssignSubjectTeachersForm(gradeSubject, assignedTeachers, {onSuccess: () => setOpen(false)});

    const teacherList = useMemo(() => {
        const assignedIds = new Set(assignedTeachers.map((a) => a.teacher.id));

        const assigned = allTeachers.filter((t) => assignedIds.has(t.id));
        const unassigned = allTeachers.filter((t) => !assignedIds.has(t.id));

        assigned.sort((a, b) => a.name.localeCompare(b.name));
        unassigned.sort((a, b) => a.name.localeCompare(b.name));

        return [...assigned, ...unassigned];
    }, [allTeachers, assignedTeachers]);

    const filteredTeacherList = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return teacherList;

        return teacherList.filter((t) => t.name.toLowerCase().includes(q));
    }, [teacherList, search]);

    const hasSearch = search.trim().length > 0;
    const submitLabel = `Assign ${selectedCount > 0 ? selectedCount : ""} Teacher${selectedCount === 1 ? "" : "s"}`;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <FilePen/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Assign Teachers to {gradeSubject.subject.name}</DialogTitle>
                </DialogHeader>

                <SearchInput className={"w-full!"} search={search} setSearch={setSearch}/>

                <form onSubmit={onSubmit} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="teacherIds"
                        render={({field}) => {
                            const selected = new Set(field.value ?? []);

                            return (
                                <FieldGroup>
                                    <div className="max-h-72 overflow-auto rounded border p-1">
                                        {filteredTeacherList.length ? (
                                            <div className="space-y-2">
                                                {filteredTeacherList.map((t) => {
                                                    const checked = selected.has(t.id);

                                                    return (
                                                        <label
                                                            key={t.id}
                                                            className="flex items-center gap-3 px-2 py-2 hover:bg-muted cursor-pointer border-b last:border-b-0"
                                                        >
                                                            <Checkbox
                                                                checked={checked}
                                                                onCheckedChange={(next) => {
                                                                    const isChecked = Boolean(next);
                                                                    const current = new Set(field.value ?? []);

                                                                    if (isChecked) current.add(t.id);
                                                                    else current.delete(t.id);

                                                                    field.onChange(Array.from(current));
                                                                }}
                                                            />
                                                            <span className="text-sm">{t.name}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-muted-foreground py-6 text-center">
                                                {hasSearch ? (
                                                    <>
                                                        No teachers match{" "}
                                                        <span className="font-medium">&quot;{search.trim()}&quot;</span>.
                                                    </>
                                                ) : (
                                                    "No teachers available."
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </FieldGroup>
                            );
                        }}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" size={"sm"} variant="outline" disabled={formIsSubmitting}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" size={"sm"} disabled={!formIsDirty || formIsSubmitting}>
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}