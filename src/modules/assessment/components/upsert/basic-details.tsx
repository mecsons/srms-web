import {startOfDay} from "date-fns";
import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {FormField} from "@/components/ui/form.tsx";
import {FieldGroup} from "@/components/ui/field.tsx";
import DatePicker from "@/components/ui/date-picker.tsx";
import {BasicDetailsTitle} from "@/modules/assessment/components/upsert/title.tsx";
import type {AssessmentSchemaType} from "@/modules/assessment/lib/validations/assessment";

export function BasicDetails() {
    const {control, watch, formState: {isSubmitting}} = useFormContext<AssessmentSchemaType>();

    const startDate = watch("startDate");
    const minStartDate = startOfDay(new Date());
    const minEndDate = startDate ? startOfDay(startDate) : minStartDate;

    return (
        <div className="flex flex-col gap-6">
            <BasicDetailsTitle/>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    label="Assessment Name"
                    name="name"
                    control={control}
                    render={({field}) => (
                        <Input {...field} disabled={isSubmitting} placeholder="Assessment Name"/>
                    )}
                />

                <FormField
                    label="Start Date"
                    name="startDate"
                    control={control}
                    render={({field}) => (
                        <DatePicker
                            minDate={minStartDate}
                            disabled={isSubmitting}
                            onChange={field.onChange}
                            value={field.value as any}
                            placeholder="Select Start Date"
                        />
                    )}
                />

                <FormField
                    label="End Date"
                    name="endDate"
                    control={control}
                    render={({field}) => (
                        <DatePicker
                            minDate={minEndDate}
                            onChange={field.onChange}
                            value={field.value as any}
                            placeholder="Select End Date"
                            disabled={isSubmitting || !startDate}
                        />
                    )}
                />
            </FieldGroup>
        </div>
    );
}