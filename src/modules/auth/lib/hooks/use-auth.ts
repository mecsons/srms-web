import {useMemo} from "react";
import type {RoleType} from "@/modules/auth/lib/types.ts";
import {roleHierarchy} from "@/modules/auth/lib/utils.ts";
import {useAuthStore} from "@/modules/auth/lib/hooks/use-auth-store.ts";

export const useCurrentUser = () => {
    const currentUser = useAuthStore((state) => state.currentUser);
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);

    if (!currentUser || !accessToken) {
        throw new Error("useCurrentUser must be used after authentication.");
    }

    return {
        logout,
        currentUser,
        accessToken,
    };
};

export function useHasRole(role: RoleType) {
    const userRoles = useAuthStore(s => s.roles);

    return useMemo(() => {
        return userRoles.some(userRole =>
            roleHierarchy[userRole]?.includes(role)
        );
    }, [userRoles, role]);
}

export function useHasAnyRole(rolesToCheck: readonly RoleType[]) {
    const userRoles = useAuthStore((s) => s.roles);

    const effectiveRoles = useMemo(() => {
        const set = new Set<RoleType>();
        for (const userRole of userRoles) {
            for (const implied of roleHierarchy[userRole] ?? [userRole]) {
                set.add(implied);
            }
        }
        return set;
    }, [userRoles]);

    return rolesToCheck.some((r) => effectiveRoles.has(r));
}