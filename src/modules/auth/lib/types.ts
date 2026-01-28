export type RoleType =
    "ROLE_ADMIN" | "ROLE_ACADEMIC_ADMIN" | "ROLE_TEACHER" | "ROLE_ACCOUNTANT" | "ROLE_STUDENT";

export interface LoginInput {
    username: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    phoneNumber: string;
}

export interface IAuth {
    accessToken: string;
    user: IUser;
}

export interface IAuthState {
    loading: boolean;
    accessToken: string | null;
    currentUser: IUser | null;
    roles: RoleType[],
    login: (credentials: LoginInput) => Promise<void>;
    logout: (allDevices?: boolean) => Promise<void>;
    refreshToken: () => Promise<void>;
    refreshInterval?: NodeJS.Timeout | null;
}

export interface IAuthTokenPayload {
    sub: string;
    roles: RoleType[];
    exp: number;
    iat: number;
}