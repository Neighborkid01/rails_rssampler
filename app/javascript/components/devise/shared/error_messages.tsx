import React from "react";

interface ErrorMessagesProps {
  errors: string[];
};

const ErrorMessages = ({ errors }: ErrorMessagesProps) => {
  const errorMessage = `${errors.length} error${errors.length === 1 ? "" : "s"} prohibited this user from being saved:`;
  return (
    <>
      {errors && errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded relative" role="alert">
          <h2>
            {errorMessage}
          </h2>
          <ul>
            {errors.map((message: string) => (
              <li>- {message}</li>
            ))}
          </ul>
        </div>)}
    </>
  );
};

export default ErrorMessages;
