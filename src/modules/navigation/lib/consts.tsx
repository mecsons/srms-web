import type {NavigationGroup} from "@/modules/navigation/types.ts";
import {LayoutDashboard, GraduationCap, FileUser, FilePenLine, LayoutPanelLeft, Users} from "lucide-react";

export const navGroups: NavigationGroup[] = [
    {
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
            },
            {
                path: "/students/graduates",
                title: "Graduates",
                icon: GraduationCap,
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
            },
            {
                path: "/academics/teachers",
                title: "Teachers",
                icon: Users
            },
            {
                path: "/academics/assessments",
                title: "Assessments",
                icon: FilePenLine,
            },
        ],
    }
];