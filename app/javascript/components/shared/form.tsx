import React, { createContext } from "react";
import { useRailsContext } from "./rails_component";
import CsrfToken from "./form_fields/csrf";
import { FormError } from "../../models/form_error";

interface FormProps {
  action: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  useAjax?: boolean;
  children: React.ReactNode;
}

const Form = ({ action, onSubmit, method = "POST", useAjax = true, children }: FormProps) => {
  const railsContext = useRailsContext();
  const actualMethod = method == "GET" ? "GET" : "POST";

  const [errors, setErrors] = React.useState<FormError | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!useAjax) {
      if (onSubmit) { onSubmit(event); }
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const jsonBody = {} as { [key: string]: any };
    // Formats the form data as JSON objects per Rails naming convention
    // e.g., "user[name]" becomes `{ user: { name: "John" } }`
    for (const kvPair of (formData as any).entries()) {
      const [key, value] = kvPair as [string, any];
      const match = key.match(/(\w+)\[(\w+)\]/);
      if (match) {
        const [, parentKey, childKey] = match;
        if (!jsonBody[parentKey]) {
          jsonBody[parentKey] = {};
        }
        jsonBody[parentKey][childKey] = value;
      } else {
        jsonBody[key] = value;
      }
    }

    try {
      const response = await fetch(action, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": railsContext.csrf_token,
        },
        body: JSON.stringify(jsonBody),
      });
      const result = await response.json();

      if (!response.ok) {
        console.warn(`Error submitting via ajax: ${response.status} - ${response.statusText}`, result);
        setErrors(result["error"]);
        return;
      }

      if (onSubmit) {
        onSubmit(result);
      }
    } catch (error) {
      console.error("Error submitting via ajax", error);
    }
  };

  return (
    <FormContext.Provider value={{ errors }}>
      <form action={action} onSubmit={handleSubmit} method={actualMethod}>
        <CsrfToken />
        {method != actualMethod && <input type="hidden" name="_method" value={method}/>}
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;

interface FormContextParams {
  errors: { [model: string]: FormError | string[] } | null;
}

const FormContext = createContext<FormContextParams | null>(null);

const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContext.Provider");
  }
  return context;
};

export { useFormContext };
