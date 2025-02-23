import React, { useEffect, useRef, useState } from "react";
import DropdownButton from "./dropdown_button";

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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef(null);

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

  const setOnClickOutside = () => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        // I'm on a plane, so no types for you
        // debugger; to help me find this later
        if (
          optionsRef.current &&
          !(optionsRef.current as any).contains(event.target) &&
          buttonRef.current &&
          !(buttonRef.current as any).contains(event.target)
        ) {
          setHidden(true);
        }
      };

      !hidden
        ? document.addEventListener("mouseup", handleClickOutside)
        : document.removeEventListener("mouseup", handleClickOutside);

      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [hidden]);
  };
  setOnClickOutside();

  return (
    <>
      <DropdownButton
        buttonRef={buttonRef}
        value={selectedValue.label}
        hidden={hidden}
        disabled={false}
        dropdownType={dropdownType}
        dropdownSize={dropdownSize}
        className={className}
        onClick={() => setHidden((shown) => !shown)}
      />
      <div ref={optionsRef} className={`${optionSizeStyling} ${hidden ? "hidden" : ""} z-10 absolute divide-y divide-slate-100 rounded-lg border border-slate-600 shadow bg-slate-700 top-13 ${optionsClassName}`}>
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
