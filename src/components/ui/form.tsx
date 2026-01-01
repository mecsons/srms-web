import React from "react";
import {Controller} from "react-hook-form";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import type {Control, ControllerFieldState, ControllerRenderProps, FieldValues, Path} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    description?: string;
    noWrapper?: boolean;
    render: (props: {
        field: ControllerRenderProps<T, Path<T>>;
        fieldState: ControllerFieldState;
    }) => React.ReactNode;
}

export function FormField<T extends FieldValues>({...props}: FormFieldProps<T>) {
    const {control, name, label, description, noWrapper, render} = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => {
                const invalid = fieldState.invalid;
                const error = fieldState.error;

                return (
                    <Field className={noWrapper ? "w-0 *:w-0 flex-none" : undefined} data-invalid={invalid}>
                        {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
                        {render({field, fieldState})}
                        {description && <FieldDescription>{description}</FieldDescription>}
                        {invalid && <FieldError errors={[error]}/>}
                    </Field>
                );
            }}
        />
    );
}