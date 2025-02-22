import React from "react";
import { FeedFilter, FilterCondition, filterPronounLabel, FilterSubstitution } from "../../models/feed_filter";
import ShowField from "../shared/show_field";
import ShowFilterConditionList from "../filter_conditions/show_list";
import DropdownButton from "../shared/dropdown_button";
import { DropdownSize, DropdownType } from "../shared/dropdown";
import ShowFilterSubstitutionList from "../filter_substitutions/show_list";

interface FeedFilterProps {
  filter: FeedFilter;
};

const FeedFilterShow = ({ filter }: FeedFilterProps) => {
  const substitutions = filter.substitutions.map((sub, i): [number, FilterSubstitution] => [i, sub]);
  const conditions = filter.conditions.map((cond, i): [number, FilterCondition] => [i, cond]);

  return <>
    <ShowField label="Source URL" value={filter.url} code={true} />

    <fieldset className="block text-md font-medium text-slate-100 mt-4">
      <legend>Filter conditions:</legend>
      <div className="text-sm">
        Keep entries where
        <DropdownButton
          value={filterPronounLabel(filter.pronoun)}
          dropdownType={DropdownType.Rounded}
          dropdownSize={DropdownSize.Small}
          disabled
        />
        of the following are true
      </div>
      <div className="mb-2">
        <ShowFilterConditionList conditions={conditions}/>
      </div>
    </fieldset>

    {substitutions && substitutions.length > 0 &&
      <fieldset className="block text-md font-medium text-slate-100">
        <legend>Substitutions:</legend>
        <div className="mb-2">
          <ShowFilterSubstitutionList substitutions={substitutions}/>
        </div>
      </fieldset>
    }
  </>;
};

export default FeedFilterShow;
