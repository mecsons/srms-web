import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {handleServerError} from "@/api";
import {Toaster} from "@/components/ui/sonner.tsx";
import {Maintenance} from "@/components/ui/maintenance.tsx";
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {initializeAuth} from "@/modules/auth/lib/hooks/use-auth-store.ts";

import {routeTree} from './routeTree.gen'
import './styles.css'
import {BreadcrumbProvider} from "@/modules/navigation/lib/context/breadcrumb-context.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: "always",
        },
        mutations: {
            onError: (error) => handleServerError(error),
        },
    },
});

const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
    ReactDOM.createRoot(rootElement).render(
        <StrictMode>
            {maintenanceMode ? (
                <Maintenance/>
            ) : (
                <QueryClientProvider client={queryClient}>
                    <BreadcrumbProvider>
                        <RouterProvider router={router} context={{queryClient}}/>
                        <Toaster closeButton richColors position="top-right"/>
                    </BreadcrumbProvider>
                </QueryClientProvider>
            )}
        </StrictMode>
    );

    initializeAuth().then(() => null);
}