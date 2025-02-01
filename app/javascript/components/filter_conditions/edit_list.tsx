import React from "react";
import { FilterCondition, FilterType } from "../../models/feed_filter";
import { useFeedContext } from "../feeds/form";
import { FilterableField } from "../../models/filterable_field";
import EditFilterCondition from "./edit";
import FormError from "../shared/form_fields/form_error";

interface EditFilterConditionListProps {
  conditions:  [number, FilterCondition][];
}

const defaultCondition: FilterCondition = {
  filter_type: FilterType.StartsWith,
  field: FilterableField.Title,
  value: "",
};

const EditFilterConditionList = ({ conditions }: EditFilterConditionListProps) => {
  const {
    setConditions,
    nextConditionId,
    setNextConditionId,
  } = useFeedContext();

  const addCondition = (e: React.MouseEvent) => {
    e.preventDefault();
    setConditions(conds => [...conds, [nextConditionId, defaultCondition]]);
    setNextConditionId(id => id + 1);
  };

  const handleValueChanged = <T,>(newValue: T, fieldName: keyof FilterCondition, id: number) => {
    setConditions(conds =>
      conds.map(([condId, cond]) => [
        condId,
        condId !== id ? cond : { ...cond, [fieldName]: newValue },
      ])
    );
  };

  return (
    <>
      <ul>
        {conditions.map((condition) => {
          const [id, cond] = condition;
          return (
            <div key={id}>
              <EditFilterCondition
                condition={cond}
                onTypeChanged={value => handleValueChanged(value, "filter_type", id)}
                onFieldChanged={value => handleValueChanged(value, "field", id)}
                onValueChanged={e => {
                  const value = e.currentTarget.value;
                  handleValueChanged(value, "value", id);
                }}
                onRemove={e => {
                  e.preventDefault();
                  setConditions(conds => conds.filter(([condId, _]) => condId !== id));
                }}
              />
            </div>
          );
        })}
      </ul>
      <div>
        <FormError field="feed_filter[conditions]" label="Conditions" />
      </div>
      <button onClick={addCondition} className="text-sm ml-4">
        + Add Condition
      </button>
    </>
  );
};

export default EditFilterConditionList;
