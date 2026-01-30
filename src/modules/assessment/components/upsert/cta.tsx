import {FilePlus} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {roleHierarchy} from "@/modules/auth/lib/utils.ts";
import {Visibility} from "@/modules/auth/components/visibility.tsx";

export function CreateAssessment() {
    return (
        <Visibility visibleTo={roleHierarchy.ROLE_ACADEMIC_ADMIN}>
            <div className="flex items-center gap-2">
                <Link to={"/academics/assessments/upsert/create"}>
                    <Button>
                        <FilePlus/>
                    </Button>
                </Link>
            </div>
        </Visibility>
    )
}