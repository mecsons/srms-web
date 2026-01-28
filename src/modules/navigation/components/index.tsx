import {navGroups} from "@/modules/navigation/lib/consts.tsx";
import type {NavigationGroup} from "@/modules/navigation/lib/types.ts";
import {useAuthStore} from "@/modules/auth/lib/hooks/use-auth-store.ts";
import {filterNavigationGroups} from "@/modules/navigation/lib/utils.ts";

export function getNavItems(): NavigationGroup[] {
    const {roles} = useAuthStore();

    return filterNavigationGroups(navGroups, roles);
}