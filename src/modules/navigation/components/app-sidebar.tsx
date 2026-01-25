import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {Link} from "@tanstack/react-router";
import {getNavItems} from "@/modules/navigation";

export function AppSidebar() {
    const {state} = useSidebar();
    const navGroups = getNavItems();

    const collapsed = state === "collapsed";

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <div className="flex items-center gap-4">
                    <div className="max-w-10">
                        <img src="/favicons/favicon-96x96.png" alt="Invento"/>
                    </div>

                    {state === "expanded" && (
                        <h1 className="font-bold text-lg">Mecsons</h1>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent>
                {navGroups.map((group, groupIndex) => (
                    <SidebarGroup key={groupIndex}>
                        {!collapsed && group.label && (
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        )}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((navItem, itemIndex) => (
                                    <SidebarMenuItem key={`${groupIndex}-${itemIndex}`}>
                                        <SidebarMenuButton
                                            asChild
                                            className="flex rounded-md px-3 py-2">
                                            <Link
                                                to={navItem.path}
                                                params={navItem.params}
                                                className="flex w-full items-center">
                                                <navItem.icon className="size-5"/>
                                                {!collapsed && (
                                                    <span className="ml-1">{navItem.title}</span>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
