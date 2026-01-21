import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import type {IGradeWithSubjects} from "@/modules/grade/lib/types.ts";

interface Props {
    grade: IGradeWithSubjects;
    selectedCount: number;
    isActive: boolean;
    onClick: () => void;
}

export function GradeListItem({grade, selectedCount, isActive, onClick}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                "hover:border-primary/50 hover:bg-muted",
                isActive && "border-primary bg-primary/5"
            )}
        >
            <span className="truncate">{grade.name}</span>
            <Badge variant={selectedCount > 0 ? "default" : "secondary"}>
                {selectedCount}
            </Badge>
        </button>
    );
}