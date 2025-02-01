import React from "react";
import { useRailsContext } from "../rails_component";

const CsrfToken = () => {
  const railsContext = useRailsContext();
  return (
    <input type="hidden" name="authenticity_token" value={railsContext.csrf_token} />
  );
};

export default CsrfToken;
