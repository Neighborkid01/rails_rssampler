import React from "react";
import CsrfToken from "./form_fields/csrf";

interface FormProps {
  action: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  children: React.ReactNode;
}

const Form = ({ action, onSubmit, method = "POST", children }: FormProps) => {
  return (
    <form action={action} onSubmit={onSubmit} method={method}>
      <CsrfToken />
      {children}
    </form>
  );
};

export default Form;
