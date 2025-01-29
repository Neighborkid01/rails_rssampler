import React from "react";
import FeedForm from "./form";
import Header from "../shared/header";
import { FeedForCreation } from "../../models/feed";
import { FeedFilterForCreation } from "../../models/feed_filter";

interface NewFeedProps {
  feed: FeedForCreation;
  filters: FeedFilterForCreation[];
}

const NewFeed = ({ feed, filters }: NewFeedProps) => {
  return (
    <>
      <Header>New Feed</Header>
      <FeedForm
        feed={feed}
        filters={filters}
      />
      <a href="/feeds">Back to Feeds</a>
    </>
  );
};

export default NewFeed;
