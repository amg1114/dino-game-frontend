import React, { JSX } from "react";

interface StyledSelectProps {
    id: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
}

export function StyledSelect({ id, options, value, onChange, label }: StyledSelectProps): JSX.Element {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-xl text-white">{label}</label>
            <select
                id={id}
                className={`rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green ${!value ? "text-white/50" : "text-white"
                    }`}
                value={value}
                onChange={onChange}
            >
                <option disabled value="">
                    Seleccione una opción
                </option>
                {options.map((option: { value: string; label: string }) => (
                    <option value={option.value} className="bg-placeholder text-white">{option.label}</option>
                ))}
            </select>
        </div>
    );
}