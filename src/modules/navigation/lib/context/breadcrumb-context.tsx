import {createContext, type ReactNode, useState} from "react";
import type {BreadcrumbContextValue, BreadcrumbItem} from "@/modules/navigation/types";

export const BreadcrumbContext =
    createContext<BreadcrumbContextValue | undefined>(undefined);

export const BreadcrumbProvider = ({children}: { children: ReactNode }) => {
    const [items, setItems] = useState<BreadcrumbItem[]>([]);

    return (
        <BreadcrumbContext.Provider value={{items, setBreadcrumbs: setItems}}>
            {children}
        </BreadcrumbContext.Provider>
    );
};