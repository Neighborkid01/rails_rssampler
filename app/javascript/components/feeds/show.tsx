import React, { useEffect, useState } from "react";
import { Feed } from "../../models/feed";
import { FeedFilter } from "../../models/feed_filter";
import FeedFilterShow from "../feed_filters/show";
import Form from "../shared/form";
import Header from "../shared/header";
import ShowField from "../shared/show_field";

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
      <Header>{feed.name}</Header>

      <ShowField label="Add this URL to your RSS reader or podcast player:" value={feedLink} code>
        <button
          onClick={copyToClipboard}
          className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium rounded-e-lg border bg-slate-700 hover:bg-slate-600 border-slate-600"
        >
          {copyText}
        </button>
      </ShowField>

      {filters.map(filter =>
        <FeedFilterShow key={filter.id} filter={filter} />
      )}

      <a href={`/feeds/${feed.feed_code}/edit`}>Edit Feed</a>
      <Form action={`/feeds/${feed.feed_code}`} method="DELETE" redirectTo="/feeds">
        <input type="submit" value="Delete Feed" onClick={() => confirm(`Are you sure you want to permenantly delete "${feed.name}?"`)}/>
      </Form>

      <a href="/feeds">Back to Feeds</a>
    </>
  );
};

export default FeedShow;
