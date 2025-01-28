import { FilterableField } from "./filterable_field";

enum FilterPronoun {
  Any = "any_",
  All = "all_",
}

function filterPronounLabel(value: string): string | undefined {
  return Object.keys(FilterPronoun).find(key => FilterPronoun[key as keyof typeof FilterPronoun] === value);
}

enum FilterType {
  StartsWith = "Starts with",
  EndsWith = "Ends with",
  Contains = "Contains",
  Matches = "Matches",
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

export {
  FilterPronoun,
  filterPronounLabel,
  FilterType,
  FilterSubstitution,
  FilterCondition,
  FeedFilter,
};
