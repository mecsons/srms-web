import type {RoleType} from "@/modules/auth/lib/types.ts";

export const rolePresets = {
    all: () => undefined,
    admin: () => ["ROLE_ADMIN"] as RoleType[],
    academicAdmin: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN"] as RoleType[],
    academicStaff: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER"] as RoleType[],
    studentsAndAcademicStaff: () => ["ROLE_ADMIN", "ROLE_ACADEMIC_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"] as RoleType[],
    custom: (...roles: RoleType[]) => roles,
};