import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T, any, T>;
    rules?: any;
    type?: string;
    showLabel?: boolean;
    inputClassName?: string;
}

export default function Input<T extends FieldValues = FieldValues>({
    name,
    label,
    control,
    rules,
    type,
    showLabel,
    inputClassName
}: InputProps<T>) {
    const { field, fieldState } = useController({ name, control, rules });

    const baseClass =
        "bg-stone-800/80 border border-stone-600 text-white placeholder:text-stone-400 h-12 w-full rounded-md px-4 py-3 transition focus:border-amber-400 focus:ring-0 focus:outline-none";

    return (
        <div>
            {showLabel && (
                <label htmlFor={field.name} className="mb-1 block text-amber-300 font-semibold">{label}</label>
            )}
            <input
                {...field}
                id={field.name}
                value={field.value ?? ''}
                type={type || "text"}
                placeholder={label}
                className={inputClassName ? `${baseClass} ${inputClassName}` : baseClass}
            />
            {fieldState.error && (
                <div className="text-red-400 text-sm mt-1">
                    {fieldState.error.message}
                </div>
            )}
        </div>
    );
}