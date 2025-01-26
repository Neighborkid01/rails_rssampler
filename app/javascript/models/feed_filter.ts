import { FilterableField } from "./filterable_field";

const enum FilterPronoun {
  Any = 0,
  All = 1,
}

const enum FilterType {
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

export { FeedFilter };
