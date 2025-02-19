import React from "react";

interface DeviseLinksProps {
  controllerName: string;
  registerable: boolean;
  recoverable: boolean;
  confirmable: boolean;
};

const DeviseLinks = ({ controllerName, registerable, recoverable, confirmable }: DeviseLinksProps) => {
  return (
    <>
      {controllerName !== "sessions" && (
        <>
          <a href="/users/sign_in">Log in</a>
          <br />
        </>
      )}

      {registerable && controllerName !== "registrations" && (
        <>
          <a href="/users/sign_up">Sign up</a>
          <br />
        </>
      )}

      {recoverable && controllerName !== "passwords" && controllerName !== "registrations" && (
        <>
          <a href="/users/password/new">Forgot your password?</a>
          <br />
        </>
      )}

      {confirmable && controllerName !== "confirmations" && (
        <>
          <a href="/users/confirmation/new">Didn't receive confirmation instructions?</a>
          <br />
        </>
      )}
    </>
  );
};

export default DeviseLinks;
