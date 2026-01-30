import type {RoleType} from "@/modules/auth/lib/types.ts";
import type {NavigationGroup, NavigationItemInterface} from "@/modules/navigation/lib/types.ts";

/**
 * Check if user has access to a navigation item based on their roles
 */
export function hasAccess(userRoles: RoleType[], allowedRoles?: RoleType[]): boolean {
    // If no roles specified, item is accessible to everyone
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }

    // Check if user has at least one of the allowed roles
    return userRoles.some(role => allowedRoles.includes(role));
}

/**
 * Filter navigation items based on user roles
 */
export function filterNavigationItems(items: NavigationItemInterface[], userRoles: RoleType[]): NavigationItemInterface[] {
    return items.filter(item => hasAccess(userRoles, item.visibleTo));
}

/**
 * Filter navigation groups based on user roles
 */
export function filterNavigationGroups(groups: NavigationGroup[], userRoles: RoleType[]): NavigationGroup[] {
   return groups
    .filter(group => hasAccess(userRoles, group.visibleTo))
    .map(group => ({
      ...group,
      navItems: filterNavigationItems(group.navItems, userRoles),
    })).filter(group => group.navItems.length > 0);
}