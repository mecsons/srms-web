import NotFound from "@/components/ui/not-found.tsx";
import {Outlet, createRootRoute} from '@tanstack/react-router'
import {AuthGuard} from "@/modules/auth/components/auth-guard.tsx";

export const Route = createRootRoute({
    component: () => (
        <AuthGuard>
          <Outlet/>
        </AuthGuard>
    ),
    notFoundComponent: () => <NotFound message={"Page not found"}/>
})