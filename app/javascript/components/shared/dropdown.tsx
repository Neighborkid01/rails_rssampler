import React, { useRef, useState } from "react";
import DropdownButton from "./dropdown_button";
import { onClickOutside } from "./utils";

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
  dropdownType?: DropdownType;
  dropdownSize?: DropdownSize;
  initialValue: T;
  valueOptions: T[];
  onValueSelected: (value: T) => void;
  toDropdownOption: (value: T) => DropdownOption;
  className?: string;
  optionsClassName?: string;
}

const Dropdown = <T,>({
  dropdownType = DropdownType.RoundedLeft,
  dropdownSize = DropdownSize.Medium,
  initialValue,
  valueOptions,
  onValueSelected,
  toDropdownOption,
  className,
  optionsClassName,
}: DropdownProps<T>) => {
  const [hidden, setHidden] = useState(true);
  const [selectedValue, setSelectedValue] = useState(toDropdownOption(initialValue));

  const ref = useRef(null);
  const clickOutsideCallback = () => { setHidden(true); };
  onClickOutside(ref, clickOutsideCallback);

  const options = valueOptions.map(opt => {
    const option = toDropdownOption(opt);
    return (
      <li key={option.value}>
        <div className="block px-4 py-2 hover:bg-slate-600 rounded"
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

  const optionSizeStyling = ((): string => {
    switch (dropdownSize) {
      case DropdownSize.Small:
        return "mx-1 py-1 px-2";
      case DropdownSize.Medium:
        return "w-40 py-2.5 px-2";
      // case DropdownSize.Large:
      //   return "py-3 px-5 text-lg";
    }
  })();

  return (
    <>
      <DropdownButton
        value={selectedValue.label}
        hidden={hidden}
        disabled={false}
        dropdownType={dropdownType}
        dropdownSize={dropdownSize}
        className={className}
        onClick={() => setHidden((shown) => !shown)}
      />
      <div ref={ref} className={`${optionSizeStyling} ${hidden ? "hidden" : ""} z-10 absolute divide-y divide-slate-100 rounded-lg border border-slate-600 shadow bg-slate-700 top-13 ${optionsClassName}`}>
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
