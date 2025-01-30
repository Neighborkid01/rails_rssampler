import React from "react";
import CsrfToken from "./form_fields/csrf";

interface FormProps {
  action: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  children: React.ReactNode;
}

const Form = ({ action, onSubmit, method = "POST", children }: FormProps) => {
  const actualMethod = method == "DELETE" ? "POST" : method;
  return (
    <form action={action} onSubmit={onSubmit} method={actualMethod}>
      <CsrfToken />
      {method == "DELETE" && <input type="hidden" name="_method" value="DELETE"/>}
      {children}
    </form>
  );
};

export default Form;
