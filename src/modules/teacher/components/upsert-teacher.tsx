import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, UserRoundPlus} from "lucide-react";
import type {ITeacher} from "@/modules/teacher/lib/types.ts";
import {FieldGroup} from "@/components/ui/field.tsx";
import {FormField} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useTeacherForm} from "@/modules/teacher/lib/hooks/use-teacher-form.ts";

interface Props {
    teacher?: ITeacher;
}

export function UpsertTeacher({teacher}:Props){
    const [open, setOpen] = useState(false);
    const {form, onSubmit, formIsSubmitting}= useTeacherForm(teacher, {onSuccess: () => setOpen(false)});

    const isEdit = !!teacher;
    const title = isEdit ? "Update Teacher" : "Add Teacher";
    const submitLabel = isEdit ? "Update Teacher" : "Create Teacher";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <Button size="icon" variant="outline">
                        <Pencil/>
                    </Button>
                ) : (
                    <Button>
                        <UserRoundPlus/>
                        <span className={"hidden md:inline"}>Add Teacher</span>
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>Fill in the teacher details</DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <FieldGroup className="grid gap-4">
                        <FormField
                            label={'Name'}
                            name={'name'}
                            control={form.control}
                            render={({field}) => <Input {...field} />}
                        />

                        <FormField
                            label={'Phone Number'}
                            name={'phoneNumber'}
                            control={form.control}
                            render={({field}) => <Input {...field} />}
                        />

                        <FormField
                            label={'Email'}
                            name={'email'}
                            control={form.control}
                            render={({field}) => <Input {...field} />}
                        />
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button type="submit" disabled={formIsSubmitting}>
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}