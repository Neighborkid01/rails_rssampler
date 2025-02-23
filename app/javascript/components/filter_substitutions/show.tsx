import React from "react";
import { FilterSubstitution } from "../../models/feed_filter";
import { filterableFieldValue } from "../../models/filterable_field";
import DropdownButton from "../shared/dropdown_button";

interface FilterSubstitutionProps {
  substitution: FilterSubstitution;
};

const FilterSubstitutionShow = ({ substitution }: FilterSubstitutionProps) => {
  return (
    <div className="flex py-1 relative">
      <DropdownButton value={filterableFieldValue(substitution.field)} />

      <div className="relative w-full">
        <div className="text-sm rounded-r-lg block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100">
          <span className="cursor-text">{substitution.value}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSubstitutionShow;
