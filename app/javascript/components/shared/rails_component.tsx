import React from "react";
import { RailsContext } from "./rails_context";

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
