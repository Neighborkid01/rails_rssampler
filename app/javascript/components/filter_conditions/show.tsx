import React from "react";
import { FilterCondition, filterTypeValue } from "../../models/feed_filter";
import DropdownButton from "../shared/dropdown_button";
import { filterableFieldValue } from "../../models/filterable_field";
import { DropdownType } from "../shared/dropdown";

interface FilterConditionProps {
  condition: FilterCondition;
};

const ShowFilterCondition = ({ condition }: FilterConditionProps) => {
  return (
    <div className="flex py-1 relative">
      <DropdownButton value={filterableFieldValue(condition.field)} />

      <DropdownButton
        value={filterTypeValue(condition.filter_type)}
        dropdownType={DropdownType.NotRounded}
        className="left-40"
      />

      <div className="relative w-full">
        <div className="text-sm rounded-r-lg block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100">
          <span className="cursor-text">{condition.value}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowFilterCondition;
