import React from "react";
import { Feed } from "../../models/feed";

interface FeedCardProps {
  feed: Feed;
}

const FeedCard = ({ feed }: FeedCardProps) => {
  return (
    <a href={`feeds/${feed.feed_code}`}>
      <li className="flex flex-col m-2 rounded-md bg-slate-500 justify-between">
        <span className="p-2">{feed.name}</span>
        <div className="relative h-64 w-64">
          <img
            src="images/placeholder.jpeg"
            alt=""
            className="absolute top-0 left-0 object-cover h-full w-full rounded-b-md"
          />
        </div>
      </li>
    </a>
  );
};

export default FeedCard;
