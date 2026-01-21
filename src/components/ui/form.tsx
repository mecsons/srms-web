import React from "react";
import {Controller} from "react-hook-form";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field.tsx";
import type {Control, ControllerFieldState, ControllerRenderProps, FieldValues, Path} from "react-hook-form";

interface FormFieldProps<T extends FieldValues, TName extends Path<T>> {
    control: Control<T>;
    name: TName;
    label?: string;
    description?: string;
    noWrapper?: boolean;
    render: (props: {
        field: ControllerRenderProps<T, TName>;
        fieldState: ControllerFieldState;
    }) => React.ReactNode;
}

export function FormField<T extends FieldValues, TName extends Path<T>>(
    {...props}: FormFieldProps<T, TName>
) {
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
