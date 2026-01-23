import {Button} from "@/components/ui/button.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface Props {
    assessment: IAssessment
}

export function Scope({assessment}: Props) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Scope</CardTitle>
            </CardHeader>

            <CardContent className={"flex flex-col gap-4"}>
                {assessment.scope.map((sc, idx) => (
                    <div key={`${sc.grade.id}-${idx}`} className="rounded-md border bg-background p-3">
                        <div className="flex justify-between items-baseline gap-4">
                            <div className="flex flex-col gap-3">
                                <div className={"flex justify-between items-baseline"}>
                                    <span className="min-w-23 text-sm font-medium">
                                        {sc.grade.name}
                                    </span>

                                    <Button size={"sm"} variant={"link"} className={"underline"}>View Results</Button>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {sc.subjects.map((s) => (
                                        <span
                                            key={s.id}
                                            className="inline-flex items-center rounded-full border bg-muted px-2 py-1 text-xs font-medium"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}