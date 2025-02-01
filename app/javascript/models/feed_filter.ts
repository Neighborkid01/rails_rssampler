import { FilterableField } from "./filterable_field";

enum FilterPronoun {
  Any = "any_",
  All = "all_",
}

function filterPronounLabel(value: FilterPronoun): string {
  const res = Object.keys(FilterPronoun).find(key => FilterPronoun[key as keyof typeof FilterPronoun] === value);
  if (res === undefined) { throw new Error(`This code should never run, how did you get here with ${value}?`); }
  return res;
}

enum FilterType {
  StartsWith = "Starts with",
  EndsWith = "Ends with",
  Contains = "Contains",
  Matches = "Matches",
}

function filterTypeValue(value: FilterType): string {
  const res = Object.keys(FilterType).find(key => FilterType[key as keyof typeof FilterType] === value);
  if (res === undefined) { throw new Error(`This code should never run, how did you get here with ${value}?`); }
  return res;
}

type FilterSubstitution = {
  field: FilterableField;
  value: string;
};

type FilterCondition = {
  filter_type: FilterType;
  field: FilterableField;
  value: string;
};

type FeedFilter = {
  id: number;
  url: string;
  pronoun: FilterPronoun,
  conditions: FilterCondition[],
  substitutions: FilterSubstitution[],
  feed_id: number;
};

type FeedFilterForCreation = {
  id?: number;
  url: string;
  pronoun: FilterPronoun,
  conditions: FilterCondition[],
  substitutions: FilterSubstitution[],
  feed_id?: number;
};

export {
  FilterPronoun,
  filterPronounLabel,
  FilterType,
  filterTypeValue,
  FilterSubstitution,
  FilterCondition,
  FeedFilter,
  FeedFilterForCreation,
};
