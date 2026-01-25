import {Badge} from "@/components/ui/badge.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";

export function getStatusBadge(assessment: IAssessment) {
    const {status} = assessment;

    switch (status) {
        case "ACTIVE":
            return <Badge variant={"success"}>{status}</Badge>;

        case "CLOSED":
            return <Badge variant={"secondary"}>{status}</Badge>;

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}