import React from "react";
import { useFormContext } from "../form";
import { FormError as FormErrorType } from "../../../models/form_error";

interface FormErrorProps {
  field: string;
  label: string;
};

const FormError = ({ field, label }: FormErrorProps) => {
  const formErrors = useFormContext().errors;

  const parseErrors = (): string[] => {
    if (!formErrors) {
      return [];
    }
    const match = field.match(/(\w+)\[(\w+)\]/);
    let errors: string[] = [];
    if (match) {
      const [_, model, attribute] = match;
      const modelErrors = formErrors[model] as FormErrorType;
      errors = modelErrors[attribute] ? modelErrors[attribute] as string[] : [];
    } else {
      errors = formErrors[field] as string[];
    }
    return errors;
  };

  const errors = parseErrors();

  return (
    <span className={`text-red-500 ${errors.length > 0 ? "" : "hidden"}`}>
      { errors.map((error) => <div key={`${label}-${error}`}>{`${label}: ${error}`}</div>) }
    </span>
  );
};

export default FormError;
