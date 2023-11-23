'use client';
import React, { ReactNode } from 'react';
import { useController } from 'react-hook-form';

interface InputProps {
  control: any;
  errorMessage?: any;
  icon?: any;
  className?: string;
  name?: string;
  type?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  [key: string]: any;
}

const MySelect: React.FC<InputProps> = ({
  control,
  errorMessage,
  icon: Icon,
  className,
  defaultValue,
  children,
  ...props
}: InputProps) => {
  const { field } = useController({
    name: props.name || '',
    control,
    defaultValue: defaultValue || '',
  });
  return (
    <div className="mb-2">
      <label
        htmlFor={props.id || props.name}
        className="block capitalize mb-2 text-sm font-semibold text-gray-900"
      >
        {props.label}
      </label>
      <div>
        <select
          {...field}
          {...props}
          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          {children}
          {/* <option value="admin">Admin</option>
          <option value="user">User</option> */}
        </select>

        {Icon && <Icon size={18} />}
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default MySelect;
