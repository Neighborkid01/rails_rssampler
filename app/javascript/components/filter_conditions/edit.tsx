import React from "react";
import Dropdown, { DropdownType } from "../shared/dropdown";
import { FilterCondition, FilterType, filterTypeValue } from "../../models/feed_filter";
import { FilterableField, filterableFieldValue } from "../../models/filterable_field";

interface EditFilterConditionListProps {
  condition: FilterCondition;
  onFieldChanged: (field: FilterableField) => void;
  onTypeChanged: (filter_type: FilterType) => void;
  onValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const EditFilterCondition = ({ condition, onTypeChanged, onFieldChanged, onValueChanged, onRemove }: EditFilterConditionListProps) => {
  const fieldOptions = Object.values(FilterableField);
  const typeOptions = Object.values(FilterType);

  return (
    <div className="flex py-1 relative">
      <Dropdown
        initialValue={condition.field}
        valueOptions={fieldOptions}
        onValueSelected={onFieldChanged}
        toDropdownOption={label => ({ value: filterableFieldValue(label)!, label: label })}
      />

      <Dropdown
        initialValue={condition.filter_type}
        valueOptions={typeOptions}
        onValueSelected={onTypeChanged}
        dropdownType={DropdownType.NotRounded}
        toDropdownOption={label => ({ value: filterTypeValue(label)!, label: label })}
        offset="left-40"
      />

      <div className="relative w-full">
        <input type="text" placeholder={`${condition.field} ${condition.filter_type.toLowerCase()}...`}
          className="block p-2.5 w-full text-sm rounded-e-lg rounded-s-2 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
          value={condition.value}
          onInput={onValueChanged}
        />
        <button
          onClick={onRemove}
          className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium rounded-e-lg border bg-red-500 hover:bg-red-600 focus:ring-red-700 border-red-500 hover:border-red-600 focus:border-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EditFilterCondition;
