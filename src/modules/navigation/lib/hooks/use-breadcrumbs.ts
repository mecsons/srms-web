
import  {useContext} from "react";
import {BreadcrumbContext} from "@/modules/navigation/lib/context/breadcrumb-context.tsx";

export const useBreadcrumbs = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
    }
    return context;
};
