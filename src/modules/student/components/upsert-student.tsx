import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {UserRoundPlus} from "lucide-react";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {FormField} from '@/components/ui/form.tsx'
import {FieldGroup} from '@/components/ui/field.tsx'
import {useStudentForm} from '@/modules/student/lib/hooks/use-student-form.ts'
import {useState} from "react";

interface Props {
    gradeId: string
}

export function UpsertStudent({gradeId}: Props) {
    const [open, setOpen] = useState(false);

    const {form, onSubmit} = useStudentForm(gradeId, {onSuccess: () => setOpen(false)});

    const formIsSubmitting = form.formState.isSubmitting

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserRoundPlus/>
                    <span className="hidden md:inline">Add Student</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Student</DialogTitle>
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

                        <Button type="submit" disabled={formIsSubmitting}>Create Student</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
