import React from "react";
import { useRailsContext } from "../rails_component";
import HiddenInput from "./hidden_input";

const CsrfToken = () => {
  const railsContext = useRailsContext();
  return (
    <HiddenInput field="authenticity_token" value={railsContext.csrf_token} />
  );
};

export default CsrfToken;
