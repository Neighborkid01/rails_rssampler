import React from "react";
import FeedCard from "./feed_card";
import CreateFeedCard from "./create_feed_card";
import Header from "../shared/header";
import { Feed } from "../../models/feed";

interface FeedsProps {
  feeds: Feed[];
}

const Feeds = ({ feeds }: FeedsProps) => {
  return (
    <>
      <Header>Feeds</Header>
      <ul className="flex flex-row flex-wrap">
        <CreateFeedCard />
        {feeds.map(feed => <FeedCard feed={feed} />)}
      </ul>
    </>
  );
};

export default Feeds;
