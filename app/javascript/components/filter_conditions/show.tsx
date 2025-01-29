import React from "react";
import { FilterCondition } from "../../models/feed_filter";

interface FilterConditionProps {
  condition: FilterCondition;
};

const FilterConditionShow = ({ condition }: FilterConditionProps) => {
  return (
    <li>{`${condition.field} ${condition.filter_type} "${condition.value}"`}</li>
  );
};

export default FilterConditionShow;
