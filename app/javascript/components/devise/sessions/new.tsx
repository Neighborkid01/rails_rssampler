import React from "react";
import LoginSignUpForm from "../../auth/form";

interface NewSessionProps {
  controllerName: string;
  recoverable: boolean;
  confirmable: boolean;
  rememberable: boolean;
};

const NewSession = ({
  controllerName,
  recoverable,
  confirmable,
  rememberable,
}: NewSessionProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Log In
        </h1>

        <LoginSignUpForm
          type="login"
          controllerName={controllerName}
          recoverable={recoverable}
          confirmable={confirmable}
          rememberable={rememberable}
        />

        <div className="mt-6 text-center">
          Don't have an account? <a href="/users/sign_up" className="text-primary hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
