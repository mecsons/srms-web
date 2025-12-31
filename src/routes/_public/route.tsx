import {useAuthStore} from "@/modules/auth/lib/hooks/use-auth-store.ts";
import {createFileRoute, Navigate, Outlet} from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: PublicRoute,
});

function PublicRoute() {
  const {currentUser, accessToken} = useAuthStore();
  const isAuthenticated = !!currentUser && !!accessToken;

  if (isAuthenticated) {
    return <Navigate to="/" replace={true}/>;
  }

  return (
      <div className="px-4">
        <Outlet/>
      </div>
  );
}