interface Props {
    title: string;
    value: string | number;
}

export function StatCard({...props}: Props) {
    const {title, value} = props;

    return (
        <div className={"p-4 rounded shadow-sm hover:shadow-md transition-shadow"}>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="font-medium">{value}</p>
        </div>
    )
}