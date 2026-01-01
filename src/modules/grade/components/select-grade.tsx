import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils.ts'
import { useMemo, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ErrorAlert } from '@/components/ui/alert.tsx'
import { LoadingInput } from '@/components/ui/progress.tsx'
import { Button, buttonVariants } from '@/components/ui/button.tsx'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover.tsx'
import { useGetAllGrades } from '@/modules/grade/lib/hooks/use-grade-service.ts'

interface Props {
  value?: string | undefined
  disabled?: boolean
  placeholder?: string
  onChange: (gradeId: string) => void
}

function SelectGrade({ ...props }: Props) {
  const {
    value, disabled = false,
    onChange, placeholder = 'Select Grade',
  } = props

  const [open, setOpen] = useState(false)
  const [internalId, setInternalId] = useState<string | undefined>(value)

  const { error, isPending, data: grades } = useGetAllGrades()

  const selectedId = value ?? internalId
  const selectedGrade = useMemo(
    () => grades?.find((grade) => grade.id == selectedId),
    [grades, selectedId],
  )

  const handleSelect = (id: string) => {
    setInternalId(id)
    onChange(id)
    setOpen(false)
  }

  if (isPending) return <LoadingInput />
  if (error) return <ErrorAlert error={error} />

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          disabled={disabled}
          variant="ghost"
          role="combobox"
          className={cn(buttonVariants({ variant: 'input' }),
            'flex justify-between',
          )}
        >
          <span className="truncate text-left min-w-0">
            {selectedGrade?.name ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-0">
        <Command>
          <CommandInput placeholder="Search grade..." />
          <CommandList>
            <CommandEmpty>No grade found.</CommandEmpty>
            <CommandGroup>
              {grades.map((grade) => (
                <CommandItem
                  key={grade.id}
                  value={grade.name}
                  disabled={disabled}
                  onSelect={() => handleSelect(grade.id)}
                >
                  {grade.name}
                  <Check
                    className={cn(
                      'ml-auto transition-opacity',
                      grade.id == selectedId ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectGrade