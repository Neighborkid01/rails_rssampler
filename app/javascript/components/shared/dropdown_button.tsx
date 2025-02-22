import React from "react";
import { DropdownSize, DropdownType } from "./dropdown";

interface DropdownButtonProps {
  value: string;
  hidden?: boolean;
  disabled?: boolean;
  dropdownType?: DropdownType;
  dropdownSize?: DropdownSize;
  onClick?: () => void;
  className?: string;
};

const DropdownButton = ({
  value,
  hidden = true,
  disabled = true,
  dropdownType = DropdownType.RoundedLeft,
  dropdownSize = DropdownSize.Medium,
  onClick = () => {},
  className,
}: DropdownButtonProps) => {
  const buttonTypeStyling = ((): string => {
    switch (dropdownType) {
      case DropdownType.RoundedLeft:
        return "rounded-s-lg border-e-0";
        // case DropdownType.RoundedRight:
        //   return = "rounded-e-lg border-s-0";
      case DropdownType.Rounded:
        return "rounded-lg";
      case DropdownType.NotRounded:
        return "border-e-0";
    };
  })();
  const buttonSizeStyling = ((): string => {
    switch (dropdownSize) {
      case DropdownSize.Small:
        return "mx-1 py-1 px-2";
      case DropdownSize.Medium:
        return "w-40 py-2.5 px-4";
        // case DropdownSize.Large:
        //   return "py-3 px-5 text-lg";
    }
  })();

  return (
    <button
      type="button"
      className={`${buttonTypeStyling} ${buttonSizeStyling} flex-shrink-0 inline-flex items-center justify-between text-sm font-medium text-center bg-slate-700 border border-slate-600 text-slate-100 hover:bg-slate-600 focus:outline-none focus:ring-slate-300 ${className}`}
      onClick={onClick}
    >
      { value }
      {!disabled &&
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d={ hidden ? "m1,1 4,4 4,-4" : "m1,4 4,-4 4,4" }
          />
        </svg>
      }
    </button>
  );
};

export default DropdownButton;
