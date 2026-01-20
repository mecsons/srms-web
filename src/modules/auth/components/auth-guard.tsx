import React from "react";
import {LoadingScreen} from "@/components/ui/progress";
import {useAuthStore} from "@/modules/auth/lib/hooks/use-auth-store.ts";

export function AuthGuard({children}: { children: React.ReactNode }) {
    const {loading} = useAuthStore();

    if (loading) return <LoadingScreen/>

    return <>{children}</>;
}