import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {formatAvatarName, formatDateString} from "@/lib/utils.ts";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {getStatusBadge} from "@/modules/assessment/lib/utils.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface Props {
    assessment: IAssessment;
}

export function Details({assessment}: Props) {
    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="size-9 cursor-pointer">
                        <AvatarFallback>
                            {formatAvatarName(assessment.createdBy.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Created by</span>
                        <span className="text-sm font-medium">
                            {assessment.createdBy.name}
                        </span>
                    </div>
                </div>

                <Separator/>

                <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Created at</div>
                    <div className="text-sm font-medium">
                        {formatDateString(assessment.createdAt, {showTimestamp: true})}
                    </div>
                </div>

                <Separator/>

                <div className="space-y-2">
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-xs text-muted-foreground">Status</div>
                        {getStatusBadge(assessment)}
                    </div>

                    <div className="text-sm">
                        {assessment.status === "ACTIVE" ? (
                            <span className="text-muted-foreground">
                                Assessment is currently ongoing.
                            </span>
                        ) : assessment.status === "CLOSED" ? (
                            <span className="text-muted-foreground">
                                Assessment is currently closed.
                            </span>
                        ) : (
                            <span className="text-muted-foreground">
                                Assessment status is {assessment.status}.
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}