import clsx from 'clsx';
import React, { JSX } from 'react';

export interface StyledInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  errors?: string[];
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  inputClassName?: string;
}

export function StyledInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  onInput,
  onKeyDown,
  label,
  name,
  errors,
  onFocus,
  onBlur,
  className,
  inputClassName,
}: StyledInputProps): JSX.Element {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={id} className="text-xl text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className={clsx(inputClassName, {
          'bg-placeholder focus:ring-green rounded p-4 text-white focus:ring-2 focus:outline-none': true,
          'ring-red focus:ring-red ring-2': errors?.length,
        })}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {errors && errors.length > 0 && (
        <span className="text-red text-sm font-bold">{errors.slice(0, 2).join(', ')}</span>
      )}
    </div>
  );
}
