import React from "react";
import { RailsContext } from "./rails_context";

const useRailsContext = () => {
  const context = React.useContext(RailsContext);
  if (!context) {
    throw new Error("useRailsContext must be used within a RailsContext.Provider");
  }
  return context;
};

export { useRailsContext };
