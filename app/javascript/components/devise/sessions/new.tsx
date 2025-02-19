import React, { useState } from "react";
import Form from "../../shared/form";
import DeviseLinks from "../shared/links";

interface NewSessionProps {
  controllerName: string;
  registerable: boolean;
  recoverable: boolean;
  confirmable: boolean;
  rememberable: boolean;
};

const NewSession = ({ controllerName, registerable, recoverable, confirmable, rememberable }: NewSessionProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <h2>Log in</h2>
      <Form action="/users/sign_in" useAjax={false}>
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
            autoComplete="current-password"
          />
        </div>

        {rememberable && (
          <div className="field">
            <input
              type="checkbox"
              id="remember_me"
              name="user[remember_me]"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember_me">Remember me</label>
          </div>
        )}

        <div className="actions">
          <button type="submit">Log in</button>
        </div>
      </Form>

      <DeviseLinks
        controllerName={controllerName}
        registerable={registerable}
        recoverable={recoverable}
        confirmable={confirmable}
      >
      </DeviseLinks>
    </>
  );
};

export default NewSession;
