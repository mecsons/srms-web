import {navItems} from "@/modules/navigation/lib/consts.tsx";
import type {NavigationGroup} from "@/modules/navigation/types.ts";

export function getNavItems(): NavigationGroup[] {
    return [
        {
            label: "Overview",
            items: [navItems.home],
        },
        {
            label: "Students",
            items: [navItems.students],
        },
    ]
}
