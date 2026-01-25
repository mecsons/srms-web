import {ExternalLink} from "lucide-react";
import {Link} from "@tanstack/react-router";
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
                            <div className="flex flex-col gap-4 w-full">
                                <div className={"flex justify-between items-end"}>
                                    <span>
                                      {idx + 1}. {sc.grade.name}
                                    </span>

                                    <Link
                                        to={"/academics/assessments/$assessmentId/results/$gradeId"}
                                        params={{assessmentId: assessment.id, gradeId: sc.grade.id}}
                                    >
                                        <Button size={"sm"} variant={"link"} className={"underline"}>
                                            View Results <ExternalLink/>
                                        </Button>
                                    </Link>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-2">
                                    {sc.gradeSubjects.map((gs) => (
                                        <span
                                            key={gs.id}
                                            className="inline-flex items-center rounded-full border bg-muted px-2 py-1 text-xs font-medium"
                                        >
                                            {gs.subject.name}
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