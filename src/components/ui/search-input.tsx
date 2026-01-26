import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";

interface Props {
    search: string;
    setSearch: (search: string) => void;
    className?: string;
}

export function SearchInput({...props}: Props) {
    const {search, setSearch, className} = props;

    return (
        <Input
            value={search}
            placeholder="Search..."
            className={cn("w-full md:w-64", className)}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}