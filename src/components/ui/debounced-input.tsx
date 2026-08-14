import { useDebouncedCallback } from '@tanstack/react-pacer/debouncer';
import React from 'react';
import { Input } from './input';

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const debouncedOnChange = useDebouncedCallback(onChange, { wait: debounce });

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debouncedOnChange(e.target.value);
      }}
    />
  );
}
