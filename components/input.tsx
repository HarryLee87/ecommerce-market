import { InputHTMLAttributes } from 'react';

interface InputProps {
  // type: string;
  // placeholder: string;
  // required: boolean;
  name: string;
  errors?: string[];
}

export default function Input({
  // type,
  // placeholder,
  // required,
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  // console.log(rest);
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
        // type={type}
        // placeholder={placeholder}
        // required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
