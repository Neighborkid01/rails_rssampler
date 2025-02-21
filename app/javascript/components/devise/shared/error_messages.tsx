import React from "react";

interface ErrorMessagesProps {
  errors: string[];
};

const ErrorMessages = ({ errors }: ErrorMessagesProps) => {
  const errorMessage = `${errors.length} error${errors.length === 1 ? "" : "s"} prohibited this user from being saved:`;
  return (
    <>
      {errors && errors.length > 0 && (
        <div id="error_explanation" data-turbo-cache="false">
          <h2>
            {errorMessage}
          </h2>
          <ul>
            {errors.map((message: string) => (
              <li>{message}</li>
            ))}
          </ul>
        </div>)}
    </>
  );
};

export default ErrorMessages;
