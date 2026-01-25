import React from "react";
import {cn} from "@/lib/utils.ts";

interface PageProps {
    children: React.ReactNode;
    className?: string;
}

export function Page({children, className}: PageProps) {
    return <div className={cn("flex flex-col gap-5", className)}>{children}</div>;
}

interface TitleProps {
    title: string
    description?: string
}

export function PageTitle({ ...props }: TitleProps) {
    const { title, description } = props

    return (
        <div>
            <h1 className="text-xl font-semibold leading-5.5">{title}</h1>
            {description && (
                <span className="text-muted-foreground text-sm">{description}</span>
            )}
        </div>
    )
}