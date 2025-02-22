import React from "react";
import { FilterSubstitution } from "../../models/feed_filter";
import ShowFilterSubstitution from "./show";

interface ShowFilterSubstitutionListProps {
  substitutions:  [number, FilterSubstitution][];
}

const ShowFilterSubstitutionList = ({ substitutions }: ShowFilterSubstitutionListProps) => {
  return (
    <ul>
      {substitutions.map(([id, sub]) => (
        <div key={id}>
          <ShowFilterSubstitution substitution={sub} />
        </div>
      ))}
    </ul>
  );
};

export default ShowFilterSubstitutionList;
