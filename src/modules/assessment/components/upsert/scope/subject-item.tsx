import {cn} from "@/lib/utils.ts";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import type {IGradeSubject} from "@/modules/grade/lib/types.ts";

interface Props {
    gradeId: string;
    gradeSubject: IGradeSubject;
    isChecked: boolean;
    isDisabled: boolean;
    onToggle: (gradeId: string, gradeSubjectId: string, checked: boolean) => void;
}

export function SubjectItem(props: Props) {
    const {gradeId, gradeSubject, isChecked, isDisabled, onToggle} = props;

    const gradeSubjectId = String(gradeSubject.id);
    const checkboxId = `scope-${gradeId}-${gradeSubjectId}`;

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
                    onToggle(gradeId, gradeSubjectId, checked === true)
                }
            />
            <span className="truncate">{gradeSubject.subject.name}</span>
        </Label>
    );
}