import type { ChangeEvent } from 'react';
import React from 'react';

type TextFieldProps = {
  value: string | number | undefined;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
  name: string;
};

const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  error,
  required,
  placeholder,
  name,
}) => {
  return (
    <div>
      <input
        value={value}
        required={required}
        type="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />

      <div className="relative bottom-2 ml-3 h-5 text-left text-sm font-light  text-amber-700">
        {error || ''}
      </div>
    </div>
  );
};

export default TextField;
