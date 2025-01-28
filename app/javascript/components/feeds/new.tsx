import React from "react";
import FeedForm from "./form";
import Header from "../shared/header";
import { Feed } from "../../models/feed";
import { FilterPronoun } from "../../models/feed_filter";

interface NewFeedProps {
  feed: Feed;
  pronoun: FilterPronoun;
}

const NewFeed = ({ feed, pronoun }: NewFeedProps) => {
  return (
    <>
      <Header>New Feed</Header>
      <FeedForm
        feed={feed}
        url=""
        pronoun={pronoun}
        conditions={[]}
        substitutions={[]}
      />
      <a href="/feeds">Back to Feeds</a>
    </>
  );
};

export default NewFeed;
