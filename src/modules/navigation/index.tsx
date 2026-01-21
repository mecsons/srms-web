import {navGroups} from "@/modules/navigation/lib/consts.tsx";
import type {NavigationGroup} from "@/modules/navigation/types.ts";

export function getNavItems(): NavigationGroup[] {
    return navGroups;
}
