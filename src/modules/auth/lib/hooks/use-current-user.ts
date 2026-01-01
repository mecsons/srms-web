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