import React, { JSX } from 'react';

interface StyledInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function StyledInput({ id, type, placeholder, value, onChange, label }: StyledInputProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xl text-white">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`bg-placeholder focus:ring-green rounded p-2 focus:ring-2 focus:outline-none ${
          !value ? 'text-white/80' : 'text-white'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
