import {Input} from "@/components/ui/input.tsx";

interface Props {
    search: string;
    setSearch: (search: string) => void;
}

export function SearchInput({...props}: Props) {
    const {search, setSearch} = props;

    return (
        <Input
            value={search}
            placeholder="Search..."
            className={"w-full md:w-64"}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}