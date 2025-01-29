import React, { useState } from "react";
import { FilterCondition, FilterPronoun, filterPronounLabel, FilterSubstitution } from "../../models/feed_filter";
import Dropdown, { DropdownSize, DropdownType } from "../shared/dropdown";
import EditFilterConditionList from "../filter_conditions/edit_list";
import EditFilterSubstitutionList from "../filter_substitutions/edit_list";

interface FeedFiltersFormProps {
  pronoun: FilterPronoun;
  conditions: [number, FilterCondition][];
  substitutions: [number, FilterSubstitution][];
}

const FeedFiltersForm = ({ pronoun, conditions, substitutions }: FeedFiltersFormProps) => {
  const [selectedPronoun, setSelectedPronoun] = useState(pronoun);
  const pronounOptions = Object.values(FilterPronoun);
  const onPronounChanged = (value: FilterPronoun) => setSelectedPronoun(value);

  const stringifySubstitutions = () => JSON.stringify(substitutions.map(([_, sub]) => sub));
  const stringifyConditions = () => JSON.stringify(conditions.map(([_, cond]) => cond));

  return (
    <>
      <fieldset className="block text-md font-medium text-slate-100">
        <legend>Filter conditions:</legend>
        <div className="text-sm">
          Keep entries where
          <Dropdown<FilterPronoun>
            initialValue={pronoun}
            valueOptions={pronounOptions}
            onValueSelected={onPronounChanged}
            dropdownType={DropdownType.Rounded}
            dropdownSize={DropdownSize.Small}
            toDropdownOption={value => ({ value, label: filterPronounLabel(value) })}
            offset="left-40"
          />
          of the following are true
          <div className="mb-2">
            <EditFilterConditionList
              conditions={conditions}
              // errors={errors}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="block text-md font-medium text-slate-100">
        <legend>Substitutions:</legend>
        <div className="mb-2">
          <EditFilterSubstitutionList
            substitutions={substitutions}
            // errors={errors}
          />
        </div>
      </fieldset>

      <input type="hidden" name="feed_filter[pronoun]" value={selectedPronoun} />
      <input type="hidden" name="feed_filter[substitutions]" value={stringifySubstitutions()}/>
      <input type="hidden" name="feed_filter[conditions]" value={stringifyConditions()}/>
    </>
  );
};

export default FeedFiltersForm;
