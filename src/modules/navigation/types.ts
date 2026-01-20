import type {LucideIcon} from "lucide-react";
import type {LinkProps} from "@tanstack/react-router";

export interface BreadcrumbItem {
    label: string;
    path?: LinkProps["to"];
    params?: LinkProps["params"];
}

export interface BreadcrumbContextValue {
    items: BreadcrumbItem[];
    setBreadcrumbs: (items: BreadcrumbItem[]) => void;
}

export interface NavigationItemInterface {
    title: string;
    icon: LucideIcon;
    path: LinkProps["to"];
    params?: LinkProps["params"];
}

export interface NavigationGroup {
    label?: string;
    items: NavigationItemInterface[];
}