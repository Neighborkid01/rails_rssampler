import React from "react";
import { FeedFilter, filterPronounLabel } from "../../models/feed_filter";
import FilterConditionShow from "../filter_conditions/show";
import FilterSubstitutionShow from "../filter_substitutions/show";

interface FeedFilterProps {
  filter: FeedFilter;
};

const FeedFilterShow = ({ filter }: FeedFilterProps) => {
  // eslint-disable-next-line react/no-array-index-key
  const substitutions = filter.substitutions.map((sub, i) => <FilterSubstitutionShow key={i} substitution={sub} />);
  // eslint-disable-next-line react/no-array-index-key
  const conditions = filter.conditions.map((cond, i) => <FilterConditionShow key={i} condition={cond} />);

  return <>
    <div>Source URL: <code>{filter.url}</code></div>

    <div>Replace the following fields with new values</div>
    <ul>
      {substitutions}
    </ul>
    <div>{`Keep entries where ${filterPronounLabel(filter.pronoun).toUpperCase()} of the following are true`}</div>
    <ul>
      {conditions}
    </ul>
  </>;
};

export default FeedFilterShow;
