import { FeedFilter } from "./feed_filter";

type Feed = {
  id: number;
  name: string;
  feed_code: string;
  feed_filters: FeedFilter[];
};

export { Feed };
