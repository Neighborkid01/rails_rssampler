import React from "react";
import { FilterCondition } from "../../models/feed_filter";
import ShowFilterCondition from "./show";

interface ShowFilterConditionListProps {
  conditions:  [number, FilterCondition][];
}

const ShowFilterConditionList = ({ conditions }: ShowFilterConditionListProps) => {
  return (
    <ul>
      {conditions.map(([id, cond]) => (
        <div key={id}>
          <ShowFilterCondition condition={cond} />
        </div>
      ))}
    </ul>
  );
};

export default ShowFilterConditionList;
