import {useState} from "react";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {FormField} from '@/components/ui/form.tsx'
import {FieldGroup} from '@/components/ui/field.tsx'
import {Pencil, UserRoundPlus} from "lucide-react";
import {useStudentForm} from '@/modules/student/lib/hooks/use-student-form.ts'
import type {IStudent} from "@/modules/student/lib/types.ts";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'

interface Props {
    gradeId: string
    student?: IStudent;
}

export function UpsertStudent({gradeId, student}: Props) {
    const [open, setOpen] = useState(false);
    const {form, onSubmit, formIsSubmitting} = useStudentForm(gradeId, student, {onSuccess: () => setOpen(false)});

    const isEdit = !!student;
    const title = isEdit ? "Update Student" : "Add Student";
    const submitLabel = isEdit ? "Update Student" : "Create Student";

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
                        <span className={"hidden md:inline"}>Add Student</span>
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>Fill in the student details</DialogDescription>
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
