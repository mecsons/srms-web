import {useAppState} from "@/hooks/use-app-state.ts";
import { LoadingOverlay } from '@/components/ui/progress.tsx'
import { useAuthStore } from '@/modules/auth/lib/hooks/use-auth-store.ts'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: ProtectedRoute,
})

function ProtectedRoute() {
  const { currentUser, accessToken } = useAuthStore()
  const isAuthenticated = !!currentUser && !!accessToken

  const appIsLoading = useAppState((s) => s.loading)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }

  return (
      <main className="w-full">
        <div className="px-4">
          <Outlet />
        </div>

        {appIsLoading && <LoadingOverlay />}
      </main>
  )
}
