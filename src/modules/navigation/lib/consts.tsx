import {LayoutDashboard, GraduationCap, BookOpenText, FileUser} from "lucide-react";
import type {NavigationGroup} from "@/modules/navigation/types.ts";

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
                path: "/academics/assessments",
                title: "Assessments",
                icon: BookOpenText,
            },
        ],
    },
];