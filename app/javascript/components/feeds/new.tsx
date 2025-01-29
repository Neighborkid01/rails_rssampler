import React from "react";
import FeedForm from "./form";
import Header from "../shared/header";
import { FeedForCreation } from "../../models/feed";
import { FeedFilterForCreation } from "../../models/feed_filter";

interface NewFeedProps {
  feed: FeedForCreation;
  filter: FeedFilterForCreation;
}

const NewFeed = ({ feed, filter }: NewFeedProps) => {
  return (
    <>
      <Header>New Feed</Header>
      <FeedForm
        feed={feed}
        filter={filter}
      />
      <a href="/feeds">Back to Feeds</a>
    </>
  );
};

export default NewFeed;
