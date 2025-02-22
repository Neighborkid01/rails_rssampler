import React, { useState } from "react";
import FormError from "./form_error";

interface InputProps {
  field: string;
  type: "text" | "email" | "password" | "tel" | "url";
  label: string;
  placeholder?: string;
  initialValue?: string | number | readonly string[];
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  className?: string;
};

const Input = ({
  field,
  type,
  label,
  placeholder,
  initialValue,
  required,
  autoFocus,
  autoComplete,
  className,
}: InputProps) => {
  const [value, setValue] = useState(initialValue || "");
  return (
    <label className="block text-md font-medium text-slate-100">
      {label}
      <input
        type={type}
        name={field}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
      <FormError field={field} label={label}/>
    </label>
  );
};

export default Input;
