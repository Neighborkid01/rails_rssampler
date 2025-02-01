// import { FeedFilter } from "./feed_filter";

type Feed = {
  id: number;
  name: string;
  feed_code: string;
  // feed_filters: FeedFilter[];
};

type FeedForCreation = {
  id?: number;
  name: string;
  feed_code?: string;
};

export {
  Feed,
  FeedForCreation,
};
