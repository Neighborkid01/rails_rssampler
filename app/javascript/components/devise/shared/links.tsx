import React from "react";

interface DeviseLinksProps {
  controllerName: string;
  recoverable: boolean;
  confirmable: boolean;
};

const DeviseLinks = ({ controllerName, recoverable, confirmable }: DeviseLinksProps) => {
  return (
    <>
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
