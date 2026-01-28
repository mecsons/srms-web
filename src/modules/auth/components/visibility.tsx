import React from "react";
import type { RoleType } from "@/modules/auth/lib/types";
import { useHasAnyRole } from "@/modules/auth/lib/hooks/use-auth";

type Props = {
    visibleTo: RoleType | readonly RoleType[];
    children: React.ReactNode;
};

export function Visibility({ visibleTo, children }: Props) {
    const roles = Array.isArray(visibleTo) ? visibleTo : [visibleTo];
    const can = useHasAnyRole(roles);

    if (!can) return null;

    return <>{children}</>;
}