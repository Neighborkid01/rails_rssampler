import React from "react";

interface ShowFieldProps {
  label: string;
  value: string;
  code?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ShowField = ({ label, value, code, className, children }: ShowFieldProps) => {
  const displayValue = code
    ? (<code>{value}</code>)
    : value;

  return (
    <label className="block text-md font-medium text-slate-100">
      {label}
      <div className={`relative text-sm rounded-lg my-2 block w-[50%] p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100 ${className}`} >
        <span className="cursor-text">{displayValue}</span>
        {children}
      </div>
    </label>
  );
};

export default ShowField;
