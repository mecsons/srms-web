import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {cn} from "@/lib/utils.ts";

interface Props {
    gradeId: string;
    subject: { id: string; name: string };
    isChecked: boolean;
    isDisabled: boolean;
    onToggle: (gradeId: string, subjectId: string, checked: boolean) => void;
}

export function SubjectItem({...props}: Props) {
    const {gradeId, subject, isChecked, isDisabled, onToggle} = props;

    const checkboxId = `scope-${gradeId}-${subject.id}`;

    return (
        <Label
            htmlFor={checkboxId}
            className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                "hover:border-primary/50 hover:bg-background",
                isChecked && "border-primary bg-primary/5"
            )}
        >
            <Checkbox
                id={checkboxId}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={(checked) =>
                    onToggle(gradeId, subject.id, checked === true)
                }
            />
            <span className="truncate">{subject.name}</span>
        </Label>
    );
}
