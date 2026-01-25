import * as React from "react";
import {Input} from "@/components/ui/input.tsx";
import {NumericFormat, type NumericFormatProps} from "react-number-format";

export interface Props extends Omit<NumericFormatProps, "value" | "onValueChange"> {
    value: string;
    onValueChange?: (value: string | undefined) => void;
}

export const NumberInput = React.forwardRef<HTMLInputElement, Props>(
    ({value, onValueChange, ...props}, ref) => {
        return (
            <NumericFormat
                {...props}
                value={value}
                thousandSeparator
                allowNegative={false}
                customInput={Input}
                getInputRef={ref}
                maxLength={props.maxLength ?? 15}
                decimalScale={props.decimalScale ?? 0}
                onChange={(e) => e.stopPropagation()}
                onValueChange={(values) => {
                    onValueChange?.(values.value);
                }}
            />
        );
    }
);