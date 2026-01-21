import {CardDescription, CardTitle} from "@/components/ui/card.tsx";

export function BasicDetailsTitle() {
    return (
        <div className="flex items-center gap-3">
            <div className="size-7 flex items-center justify-center rounded-full border-2 border-primary">
                <span className="text-sm font-medium">1</span>
            </div>

            <div>
                <CardTitle className="font-normal">Basic Details</CardTitle>
                <CardDescription className="text-xs">
                    Fill in the basic details for this assessment
                </CardDescription>
            </div>
        </div>
    )
}

export function ScopDetailsTitle() {
    return (
        <div className="flex items-center gap-3">
            <div className="size-7 flex items-center justify-center rounded-full border-2 border-primary">
                <span className="text-sm font-medium">2</span>
            </div>

            <div>
                <CardTitle className="font-normal">Scope Details</CardTitle>
                <CardDescription className="text-xs">
                    Fill in the scope details for this assessment
                </CardDescription>
            </div>
        </div>
    )
}