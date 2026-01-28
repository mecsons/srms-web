import type {NavigationGroup} from "@/modules/navigation/lib/types.ts";
import {LayoutDashboard, GraduationCap, FileUser, FilePenLine, LayoutPanelLeft, Users} from "lucide-react";
import {rolePresets} from "@/modules/auth/lib/utils.ts";

export const navGroups: NavigationGroup[] = [
    {
        roles: rolePresets.all(),
        label: "Overview",
        items: [
            {
                path: "/",
                title: "Home",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        label: "Students",
        items: [
            {
                path: "/students",
                title: "Students",
                icon: FileUser,
                roles: rolePresets.academicStaff(),
            },
            {
                path: "/students/graduates",
                title: "Graduates",
                icon: GraduationCap,
                roles: rolePresets.admin(),
            },
        ],
    },
    {
        label: "Academics",
        items: [
            {
                path: "/academics/grades",
                title: "Grades",
                icon: LayoutPanelLeft,
                roles: rolePresets.academicStaff(),
            },
            {
                path: "/academics/teachers",
                title: "Teachers",
                icon: Users,
                roles: rolePresets.academicAdmin(),
            },
            {
                path: "/academics/assessments",
                title: "Assessments",
                icon: FilePenLine,
                roles: rolePresets.studentsAndAcademicStaff(),
            },
        ],
    }
];