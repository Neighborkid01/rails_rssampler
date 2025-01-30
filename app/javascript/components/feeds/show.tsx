import React, { useEffect, useState } from "react";
import { Feed } from "../../models/feed";
import { FeedFilter } from "../../models/feed_filter";
import FeedFilterShow from "../feed_filters/show";

interface FeedProps {
  feed: Feed;
  filters: FeedFilter[];
}

const FeedShow = ({ feed, filters }: FeedProps) => {
  const [feedLink, setFeedLink] = useState(`https://someurl.com/feeds/${feed.feed_code}.xml`);
  const [copyText, setCopyText] = useState("Copy");

  useEffect(() => {
    const currentUrl = window.location.origin;
    setFeedLink(`${currentUrl}/feeds/${feed.feed_code}.xml`);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedLink).then(
      () => {
        setCopyText("Copied!");
        console.log("Copied successfully");
        setTimeout(() => setCopyText("Copy"), 1000);
      },
      (err) => { console.error("Could not copy text: ", err); }
    );
  };

  return (
    <>
      <h1>{`Feed: ${feed.name}`}</h1>

      {filters.map(filter =>
        <FeedFilterShow key={filter.id} filter={filter} />
      )}

      <div>
        <label>
          Add this URL to your RSS reader or podcast player:
          <span>
            <code className="m-2">{feedLink}</code>
            <button onClick={copyToClipboard}>
              {copyText}
            </button>
          </span>
        </label>
      </div>

      <br />
      <a href={`/feeds/${feed.feed_code}/edit`}>Edit Feed</a>
      <form action={`feeds/${feed.feed_code}`} method="DELETE">
        <input type="hidden" name="id" value={feed.id}/>
        <input type="submit" value="Delete Feed" onClick={() => confirm(`Are you sure you want to permenantly delete "${feed.name}?"`)}/>
      </form>

      <a href="/feeds">Back to Feeds</a>
    </>
  );
};

export default FeedShow;
