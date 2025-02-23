import React, { createContext } from "react";
import { User } from "../../models/user";

interface RailsComponentProps {
  component: string;
  props: any;
  context: any;
}

const RailsComponent = ({ component, props, context }: RailsComponentProps) => {
  const ViewComponent = require(`components/${component}`).default;

  return (
    <RailsContext.Provider value={context}>
      <ViewComponent {...props} />
    </RailsContext.Provider>
  );
};

export default RailsComponent;

interface RailsContextParams {
  csrf_token: string;
  current_user: User | null;
}

const RailsContext = createContext<RailsContextParams | null>(null);

const useRailsContext = () => {
  const context = React.useContext(RailsContext);
  if (!context) {
    throw new Error("useRailsContext must be used within a RailsContext.Provider");
  }
  return context;
};

export { useRailsContext };
