import React from "react";
import { FilterCondition, FilterType } from "../../models/feed_filter";
import DropdownButton from "../shared/dropdown_button";
import { DropdownType } from "../shared/dropdown";

interface FilterConditionProps {
  condition: FilterCondition;
};

const ShowFilterCondition = ({ condition }: FilterConditionProps) => {
  return (
    <div className="flex py-1 relative">
      <DropdownButton value={condition.field} />

      <DropdownButton
        value={condition.filter_type}
        dropdownType={DropdownType.NotRounded}
        className="left-40"
      />

      <div className="relative w-full">
        <div className="text-sm rounded-r-lg block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100">
          <span className="cursor-text">
            {condition.filter_type === FilterType.Matches
              ? <code>{condition.value}</code>
              : condition.value
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowFilterCondition;
