import React, { useState } from "react";
import Form from "../shared/form";
import DeviseLinks from "../devise/shared/links";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <Form action={action} useAjax={false} className="space-y-6">
        <label className="block text-md font-medium text-slate-100">
          Email
          <input
            type="email"
            name="user[email]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="email"
            className="text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-900 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* <FormError errors field=LoginOrSignupFormField::Email /> */}
        </label>

        <label className="block text-md font-medium text-slate-100">
          Password
          <input
            type="password"
            name="user[password]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-900 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* <FormError errors field=LoginOrSignupFormField::Password /> */}
        </label>

        {type === "signup" && (
          <label className="block text-md font-medium text-slate-100">
            Confirm Password
            <input
              type="password"
              name="user[confirm_password]"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              autoComplete="new-password-confirmation"
              className="text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-900 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* <FormError errors field=LoginOrSignupFormField::ConfirmPassword /> */}
          </label>
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
