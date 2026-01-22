import {StatCard} from "@/components/ui/stat-card.tsx";
import type {IAssessment} from "@/modules/assessment/lib/types.ts";
import {Scope} from "@/modules/assessment/components/overview/scope.tsx";
import {Details} from "@/modules/assessment/components/overview/details.tsx";

interface Props {
    assessment: IAssessment
}

export function OverviewTab({assessment}: Props) {
    return (
        <div className={"flex flex-col gap-7"}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatCard title={"Academic Year"} value={"2025"}/>
                <StatCard title={"Duration"} value={"Jan 15, 2026 → Jan 29, 2026"}/>
                <StatCard title={"Scope"} value={"3 grades • 8 subjects"}/>
                <StatCard title={"Results Coverage"} value={"412 / 520 students entered"}/>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Scope assessment={assessment}/>
                <Details assessment={assessment}/>
            </div>
        </div>
    )
}