import clsx from 'clsx';
import React, { JSX } from 'react';

interface StyledInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
  errors?: string[];
}

export function StyledInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  label,
  name,
  errors,
}: StyledInputProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xl text-white">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={clsx({
          'bg-placeholder focus:ring-green rounded p-4 text-white focus:ring-2 focus:outline-none': true,
          'ring-red focus:ring-red ring-2': errors?.length,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name || id}
      />

      {errors && errors.length > 0 && (
        <span className="text-red text-sm font-bold">{errors.slice(0, 2).join(', ')}</span>
      )}
    </div>
  );
}
