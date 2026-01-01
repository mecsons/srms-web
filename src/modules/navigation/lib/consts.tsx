import {LayoutDashboard, GraduationCap} from "lucide-react";
import type {NavigationItemInterface} from "@/modules/navigation/types.ts";

export const navItems:Record<string, NavigationItemInterface> = {
    home: {
        path: "/",
        title: "Home",
        icon: LayoutDashboard,
    },
    students: {
        path: "/students",
        title: "Students",
        icon: GraduationCap,
    },
};