import React from "react";
import ErrorMessages from "../shared/error_messages";
import LoginSignUpForm from "../../auth/form";

interface NewRegistrationProps {
  controllerName: string;
  recoverable: boolean;
  confirmable: boolean;
  errors: string[];
};

const NewRegistration = ({
  controllerName,
  recoverable,
  confirmable,
  errors,
}: NewRegistrationProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Sign Up
        </h1>
        <ErrorMessages errors={errors} />
        <LoginSignUpForm
          type="signup"
          controllerName={controllerName}
          recoverable={recoverable}
          confirmable={confirmable}
          rememberable={false}
        />

        <div className="mt-6 text-center">
          Already have an account? <a href="/users/sign_in" className="text-primary hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default NewRegistration;
