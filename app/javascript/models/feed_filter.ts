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

function filterTypeValue(value: string): string | undefined {
  return Object.keys(FilterType).find(key => FilterType[key as keyof typeof FilterType] === value);
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

type FeedFilterForCreation = Omit<FeedFilter, "id" | "feed_id">;

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
