import { createContext } from "react";

interface RailsContextParams {
  csrf_token: string;
}

const RailsContext = createContext<RailsContextParams | null>(null);

export { RailsContext, RailsContextParams };
