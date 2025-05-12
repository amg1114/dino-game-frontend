import clsx from 'clsx';
import { StyledInputProps } from './StyledInput';

type BaseStyledInputProps = Omit<StyledInputProps, 'type' | 'onChange'>;
interface StyledTextAreaProps extends BaseStyledInputProps {
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function StyledTextArea({ id, placeholder, value, onChange, label, name, errors }: StyledTextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-xl text-white">
          {label}
        </label>
      )}
      <textarea
        rows={4}
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
