import * as React from "react"
import {cn} from "@/lib/utils.ts"
import {CalendarIcon} from "lucide-react"
import {Button} from "@/components/ui/button.tsx"
import {addYears, format, startOfDay} from "date-fns"
import {Calendar} from "@/components/ui/calendar.tsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx"

interface Props {
    value?: Date | undefined
    onChange?: (date: Date | undefined) => void
    disabled?: boolean
    placeholder?: string
    className?: string
    minDate?: Date
    maxDate?: Date
}

function DatePicker({...props}: Props) {
    const {
        value, onChange, disabled = false, placeholder = "Pick a date",
        className, minDate, maxDate = startOfDay(addYears(new Date(), 10))
    } = props;

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

    const handleSelect = (date: Date | undefined) => {
        onChange?.(date)
        setIsPopoverOpen(false)
    }

    return (
        <Popover modal={true} open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="size-4 text-muted-foreground"/>
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleSelect}
                    startMonth={minDate}
                    endMonth={maxDate}
                    autoFocus
                    disabled={(day: Date) => {
                        const isBeforeMin = minDate ? day < minDate : false
                        const isAfterMax = maxDate ? day > maxDate : false
                        return isBeforeMin || isAfterMax
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker