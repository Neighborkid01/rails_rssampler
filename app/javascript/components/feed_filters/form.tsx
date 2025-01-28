import React, { useState } from "react";
import { FilterCondition, FilterPronoun, filterPronounLabel, FilterSubstitution } from "../../models/feed_filter";
import Dropdown, { DropdownSize, DropdownType } from "../shared/dropdown";

interface FeedFiltersFormProps {
  pronoun: FilterPronoun;
  conditions: FilterCondition[];
  substitutions: FilterSubstitution[];
}

const FeedFiltersForm = ({ pronoun, conditions, substitutions }: FeedFiltersFormProps) => {
  const [selectedPronoun, setSelectedPronoun] = useState(pronoun);
  const pronounOptions = Object.values(FilterPronoun);
  const onPronounChanged = (value: FilterPronoun) => setSelectedPronoun(value);

  const stringifySubstitutions = () => JSON.stringify(substitutions);
  const stringifyConditions = () => JSON.stringify(conditions);

  return (
    <>
      <label className="block text-md font-medium text-slate-100">
        Filter conditions:
        <div className="text-sm">
          Keep entries where
          <Dropdown<FilterPronoun>
            initialValue={pronoun}
            valueOptions={pronounOptions}
            onValueSelected={onPronounChanged}
            dropdownType={DropdownType.Rounded}
            dropdownSize={DropdownSize.Small}
            toDropdownOption={value => ({ value, label: filterPronounLabel(value)! })}
            offset="left-40"
          />
          of the following are true
          <div className="mb-2">
            {/* <EditFilterConditionList conditions errors /> */}
          </div>
        </div>
      </label>

      <label className="block text-md font-medium text-slate-100">
        Substitutions:
        <div className="mb-2">
          {/* <EditFilterSubstitutionList substitutions={substitutions} errors /> */}
        </div>
      </label>

      <input type="hidden" name="feed_filter[pronoun]" value={selectedPronoun} />
      <input type="hidden" name="feed_filter[substitutions]" value={stringifySubstitutions()}/>
      <input type="hidden" name="feed_filter[conditions]" value={stringifyConditions()}/>
    </>
  );
};

export default FeedFiltersForm;
