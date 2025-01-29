import React from "react";
import { FilterSubstitution } from "../../models/feed_filter";

interface FilterSubstitutionProps {
  substitution: FilterSubstitution;
};

const FilterSubstitutionShow = ({ substitution }: FilterSubstitutionProps) => {
  return (
    <li>{`${substitution.field} "${substitution.value}"`}</li>
  );
};

export default FilterSubstitutionShow;
