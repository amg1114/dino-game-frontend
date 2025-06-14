import clsx from 'clsx';
import React, { JSX } from 'react';

interface StyledSelectProps {
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  errors?: string[];
}

export function StyledSelect({ id, options, value, onChange, label, errors }: StyledSelectProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xl text-white">
        {label}
      </label>
      <select
        id={id}
        className={clsx({
          'bg-placeholder focus:ring-green h-14 rounded p-4 text-white focus:ring-2 focus:outline-none': true,
          'ring-red focus:ring-red ring-2': errors?.length,
        })}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          Seleccione una opción
        </option>
        {options.map((option: { value: string; label: string }, index) => (
          <option value={option.value} className="bg-placeholder text-white" key={id + index}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors.length > 0 && (
        <span className="text-red text-sm font-bold">{errors.slice(0, 2).join(', ')}</span>
      )}
    </div>
  );
}
