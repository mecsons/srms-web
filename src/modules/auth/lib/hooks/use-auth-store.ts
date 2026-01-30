import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import {AuthService} from "@/modules/auth/lib/service/auth-service.ts";
import type {IAuthState, IAuthTokenPayload, LoginInput} from "@/modules/auth/lib/types.ts";

export const useAuthStore = create<IAuthState>((set, get) => {
    const refreshInterval: NodeJS.Timeout | null = null;

    const clearRefreshInterval = () => {
        if (refreshInterval) clearInterval(refreshInterval);
    };

    return {
        loading: true,
        accessToken: null,
        currentUser: null,
        roles: [],

        login: async (credentials: LoginInput) => {
            try {
                const {accessToken, user} = await AuthService.userLogin(credentials);

                set({
                    accessToken,
                    currentUser: user,
                    roles: jwtDecode<IAuthTokenPayload>(accessToken).roles,
                });
            } catch (error) {
                throw error;
            }
        },

        logout: async (allDevices: boolean = true) => {
            set({loading: true});
            await AuthService.userLogout(allDevices);
            set({accessToken: null, currentUser: null, roles: [], loading: false});
            clearRefreshInterval();
        },

        refreshToken: async () => {
            try {
                const {accessToken, user} = await AuthService.refreshToken();

                if (!accessToken || !user) {
                    await get().logout();
                    return;
                }

                set({
                    accessToken,
                    currentUser: user,
                    roles: jwtDecode<IAuthTokenPayload>(accessToken).roles,
                });
            } catch (error) {
                console.error("Failed to refresh token", error);
            }
        },
    };
});

export const initializeAuth = async () => {
    const {refreshToken} = useAuthStore.getState();
    await refreshToken();

    useAuthStore.setState({loading: false});

    const interval = setInterval(refreshToken, 14 * 60 * 1000);
    useAuthStore.setState({refreshInterval: interval});
};