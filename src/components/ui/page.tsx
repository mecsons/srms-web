import React from "react";

interface PageProps {
    children: React.ReactNode;
}

export function Page({children}: PageProps) {
    return <div className={"flex flex-col gap-5"}>{children}</div>;
}

interface TitleProps {
    title: string
    description?: string
}

export function PageTitle({ ...props }: TitleProps) {
    const { title, description } = props

    return (
        <div>
            <h1 className="text-md font-medium leading-2">{title}</h1>
            {description && (
                <span className="text-muted-foreground text-sm">{description}</span>
            )}
        </div>
    )
}