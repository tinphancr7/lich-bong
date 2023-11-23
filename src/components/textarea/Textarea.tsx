'use client';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldError, useController } from 'react-hook-form';

interface TextareaProps {
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

const Textarea: React.FC<TextareaProps> = ({
  control,
  errorMessage,
  icon: Icon,
  className,
  ...props
}: TextareaProps) => {
  const { field } = useController({
    name: props.name || '',
    control,
    defaultValue: '',
  });
  return (
    <div className="mb-2">
      <label
        htmlFor={props.id || props.name}
        className="block capitalize mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      <textarea
        {...field}
        {...props}
        className="bg-gray-50 h-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      ></textarea>

      {errorMessage && (
        <div className="text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default Textarea;
