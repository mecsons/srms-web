import type {RoleType} from "@/modules/auth/lib/types.ts";

export const roleHierarchy: Record<RoleType, RoleType[]> = {
    ROLE_ADMIN: ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER", "ROLE_ACCOUNTANT", "ROLE_STUDENT"],
    ROLE_ACADEMIC_ADMIN: ["ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER"],
    ROLE_TEACHER: ["ROLE_TEACHER"],
    ROLE_ACCOUNTANT: ["ROLE_ACCOUNTANT"],
    ROLE_STUDENT: ["ROLE_STUDENT"],
};

export const roleGroups = {
    custom: (...roles: RoleType[]) => roles,
    adminOnly: () => ["ROLE_ADMIN"] as RoleType[],
    adminAndAcademic: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN"] as RoleType[],
    academicStaff: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER"] as RoleType[],
    allUsers: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER", "ROLE_ACCOUNTANT", "ROLE_STUDENT"] as RoleType[],
};