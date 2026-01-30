import {roleGroups} from "@/modules/auth/lib/utils.ts";
import type {NavigationGroup} from "@/modules/navigation/lib/types.ts";
import {LayoutDashboard, GraduationCap, FileUser, FilePenLine, LayoutPanelLeft, Users} from "lucide-react";

export const navGroups: NavigationGroup[] = [
    {
        label: "Overview",
        navItems: [
            {
                path: "/",
                title: "Home",
                icon: LayoutDashboard,
            },
        ],
        visibleTo:roleGroups.allUsers(),
    },
    {
        label: "Students",
        navItems: [
            {
                path: "/students",
                title: "Students",
                icon: FileUser,
                visibleTo: roleGroups.academicStaff(),
            },
            {
                path: "/students/graduates",
                title: "Graduates",
                icon: GraduationCap,
                visibleTo: roleGroups.adminOnly(),
            },
        ],
    },
    {
        label: "Academics",
        navItems: [
            {
                path: "/academics/grades",
                title: "Grades",
                icon: LayoutPanelLeft,
                visibleTo: roleGroups.academicStaff(),
            },
            {
                path: "/academics/teachers",
                title: "Teachers",
                icon: Users,
                visibleTo: roleGroups.adminAndAcademic(),
            },
            {
                path: "/academics/assessments",
                title: "Assessments",
                icon: FilePenLine,
                visibleTo: roleGroups.allUsers(),
            },
        ],
    }
];