import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {LogOut} from "lucide-react";
import {cn, formatAvatarName} from "@/lib/utils";
import {Fragment} from "react";
import {Link, useRouter} from "@tanstack/react-router";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {useCurrentUser} from "@/modules/auth/lib/hooks/use-current-user.ts";
import {useBreadcrumbs} from "@/modules/navigation/lib/hooks/use-breadcrumbs.ts";

export function SiteHeader({className}: { className?: string }) {
    const {navigate} = useRouter();
    const {currentUser, logout} = useCurrentUser();
    const {items: breadcrumbs} = useBreadcrumbs();

    return (
        <header className={cn("flex justify-between items-center py-2 mb-4 border-b bg-transparent", className)}>
            <div className="flex items-center gap-2">
                <SidebarTrigger/>

                {breadcrumbs.length > 0 && <div className="mr-1 border-r-2 w-1 h-5"></div>}

                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((b, i) => (
                            <Fragment key={`${b.label}-${i}`}>
                                {b.path ? (
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link to={b.path} params={b.params}>
                                                {b.label}
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{b.label}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                                {i < breadcrumbs.length - 1 && <BreadcrumbSeparator/>}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="size-9 cursor-pointer!">
                            <AvatarFallback>
                                {formatAvatarName(currentUser.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"} className="min-w-52">
                        <DropdownMenuLabel>
                            <div className={"flex items-center gap-2"}>
                                <Avatar className="size-8 cursor-pointer!">
                                    <AvatarFallback>
                                        {formatAvatarName(currentUser.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className={"flex flex-col"}>
                                    <span className={"text-md"}>{currentUser.name}</span>
                                    <span className={"text-xs text-muted-foreground"}>{currentUser.phoneNumber}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator/>

                        <DropdownMenuItem
                            onClick={async () => {
                                await logout();
                                await navigate({to: "/login", replace: true});
                            }}>
                            <LogOut className={"size-4"}/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}