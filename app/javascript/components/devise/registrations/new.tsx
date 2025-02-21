import React, { useState } from "react";
import SharedLinks from "../shared/links";
import Form from "../../shared/form";
import ErrorMessages from "../shared/error_messages";

interface NewRegistrationProps {
  controllerName: string;
  registerable: boolean;
  recoverable: boolean;
  confirmable: boolean;
  errors: string[];
};

const NewRegistration = ({
  controllerName,
  registerable,
  recoverable,
  confirmable,
  errors,
}: NewRegistrationProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div>
      <h2>Sign up</h2>
      <ErrorMessages errors={errors} />
      <Form action="/users" useAjax={false}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="user[email]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="user[password]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="field">
          <label htmlFor="password_confirmation">Password Confirmation</label><br />
          <input
            type="password"
            id="password_confirmation"
            name="user[password_confirmation]"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="actions">
          <button type="submit">Sign up</button>
        </div>
      </Form>
      <SharedLinks controllerName={controllerName} registerable={registerable} recoverable={recoverable} confirmable={confirmable} />
    </div>
  );
};

export default NewRegistration;
