import React, { useState } from "react";
import Form from "../shared/form";
import DeviseLinks from "../devise/shared/links";
import Input from "../shared/form_fields/input";

interface LoginSignUpFormProps {
  type: "login" | "signup";
  controllerName: string;
  recoverable: boolean;
  confirmable: boolean;
  rememberable: boolean;
};

const LoginSignUpForm = ({
  type,
  controllerName,
  recoverable,
  confirmable,
  rememberable,
}: LoginSignUpFormProps) => {
  const action = type === "login" ? "/users/sign_in" : "/users";
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <Form action={action} useAjax={false} className="space-y-6">
        <Input
          type="email"
          field="user[email]"
          label="Email"
          className="bg-slate-900"
          required
          autoFocus
          autoComplete="email"
        />
        <Input
          type="password"
          field="user[password]"
          label="Password"
          className="bg-slate-900"
          required
          autoComplete="new-password"
        />

        {type === "signup" && (
          <Input
            type="password"
            field="user[confirm_password]"
            label="Confirm Password"
            className="bg-slate-900"
            required
            autoComplete="new-password-confirmation"
          />
        )}

        {type === "login" && rememberable && (
          <div className="block">
            <label className="text-md font-medium text-slate-100">
              <input
                type="checkbox"
                name="user[remember_me]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              /> Remember me
            </label>
          </div>
        )}

        <button type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded transition duration-200"
        >
          {type === "login" ? "Log In" : "Sign Up"}
        </button>
      </Form>

      <div className="block mt-6">
        <DeviseLinks
          controllerName={controllerName}
          recoverable={recoverable}
          confirmable={confirmable}
        />
      </div>
    </>
  );
};

export default LoginSignUpForm;
