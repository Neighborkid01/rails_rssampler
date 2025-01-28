import React, { useState } from "react";

enum DropdownType {
  RoundedLeft,
  // RoundedRight,
  Rounded,
  NotRounded,
}

enum DropdownSize {
  Small,
  Medium,
  // Large,
}

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps<T> {
  dropdownType: DropdownType;
  dropdownSize: DropdownSize;
  initialValue: T;
  valueOptions: T[];
  onValueSelected: (value: T) => void;
  toDropdownOption: (value: T) => DropdownOption;
  offset: string;
}

const Dropdown = <T,>({
  dropdownType = DropdownType.RoundedLeft,
  dropdownSize = DropdownSize.Medium,
  initialValue,
  valueOptions,
  onValueSelected,
  toDropdownOption,
  offset = "",
}: DropdownProps<T>) => {
  const [hidden, setHidden] = useState(true);
  const [selectedValue, setSelectedValue] = useState(toDropdownOption(initialValue));

  const options = valueOptions.map(opt => {
    const option = toDropdownOption(opt);
    return (
      <li key={option.value}>
        <div className="block px-4 py-2 hover:bg-slate-600"
          onClick={e => {
            e.preventDefault();
            onValueSelected(opt);
            setSelectedValue(option);
            setHidden(true);
          }}
        >
          { option.label }
        </div>
      </li>
    );
  });

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
  const [buttonSizeStyling, optionSizeStyling] = ((): [string, string] => {
    switch (dropdownSize) {
      case DropdownSize.Small:
        return ["mx-1 py-1 px-2", "mx-1 py-1 px-2"];
      case DropdownSize.Medium:
        return ["w-40 py-2.5 px-4", "w-40 py-2.5 px-4"];
      // case DropdownSize.Large:
      //   return ["py-3 px-5 text-lg", "py-3 px-5 text-lg"];
    }
  })();

  return (
    <>
      <button
        type="button"
        className={`${buttonTypeStyling} ${buttonSizeStyling} flex-shrink-0 inline-flex items-center justify-between text-sm font-medium text-center bg-slate-700 border border-slate-600 text-slate-100 hover:bg-slate-600 focus:outline-none focus:ring-slate-300`}
        onClick={() => setHidden((shown) => !shown)}
      >
        { selectedValue.label }
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d={ hidden ? "m1,1 4,4 4,-4" : "m1,4 4,-4 4,4" }
          />
        </svg>
      </button>
      <div className={`${optionSizeStyling} ${offset} ${hidden ? "hidden" : ""} z-10 absolute divide-y divide-slate-100 rounded-lg border border-slate-600 shadow bg-slate-700`}>
        <ul className="py-2 text-sm text-slate-100" aria-labelledby="dropdown-options">
          { options }
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
export {
  DropdownOption,
  DropdownType,
  DropdownSize,
};
