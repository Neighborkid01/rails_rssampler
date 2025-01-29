import React from "react";
import { FilterSubstitution } from "../../models/feed_filter";
import { useFeedContext } from "../feeds/form";
import { FilterableField } from "../../models/filterable_field";
import EditFilterSubstitution from "./edit";

interface EditFilterSubstitutionListProps {
  substitutions:  [number, FilterSubstitution][];
  // errors: x;
}

const defaultSubstitution: FilterSubstitution = {
  field: FilterableField.Title,
  value: "",
};

const EditFilterSubstitutionList = ({ substitutions }: EditFilterSubstitutionListProps) => {
  const {
    setSubstitutions,
    nextSubstitutionId,
    setNextSubstitutionId,
  } = useFeedContext();

  const addSubstitution = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubstitutions(subs => [...subs, [nextSubstitutionId, defaultSubstitution]]);
    setNextSubstitutionId(id => id + 1);
  };

  const handleValueChanged = <T,>(newValue: T, fieldName: string, id: number) => {
    setSubstitutions(subs =>
      subs.map(([subId, sub]) => [
        subId,
        subId !== id ? sub : { ...sub, [fieldName]: newValue },
      ])
    );
  };

  return (
    <>
      <ul>
        {substitutions.map((substitution) => {
          const [id, sub] = substitution;
          return <div key={id}>
            <EditFilterSubstitution
              substitution={sub}
              onFieldChanged={value => handleValueChanged(value, "field", id)}
              onValueChanged={e => {
                const value = e.currentTarget.value;
                handleValueChanged(value, "value", id);
              }}
              onRemove={e => {
                e.preventDefault();
                setSubstitutions(subs => subs.filter(([subId, _]) => subId !== id));
              }}
            />
          </div>;
        })}
      </ul>
      <div>
        {/* <FormError errors field=FeedFormField::Substitution />
        <FormError errors field=FeedFormField::Substitutions /> */}
      </div>
      <button onClick={addSubstitution} className="text-sm ml-4">
        + Add Substitution
      </button>
    </>
  );
};

export default EditFilterSubstitutionList;
