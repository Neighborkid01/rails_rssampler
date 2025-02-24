import React, { useEffect, useState } from "react";
import { Feed } from "../../models/feed";
import { FeedFilter, FeedFilterForPreview } from "../../models/feed_filter";
import FeedFilterShow from "../feed_filters/show";
import Form from "../shared/form";
import Header from "../shared/header";
import ShowField from "../shared/show_field";
import FeedPreview from "./preview";

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
      {filters.map(filter => {
        const previewFilter = {
          url: filter.url,
          pronoun: filter.pronoun,
          conditions: JSON.stringify(filter.conditions),
          substitutions: JSON.stringify(filter.substitutions),
        } as FeedFilterForPreview;
        return <React.Fragment key={filter.id}>
          <FeedFilterShow filter={filter} />
          <FeedPreview filter={previewFilter} />
        </React.Fragment>;
      })}
      <div className="flex justify-end mt-6">
        <a href={`/feeds/${feed.feed_code}/edit`} className="px-4 py-2 hover:underline">Edit Feed</a>
        <Form action={`/feeds/${feed.feed_code}`} method="DELETE" redirectTo="/feeds">
          <input
            type="submit"
            value="Delete Feed"
            className="px-4 py-2 bg-primary rounded-lg hover:bg-slate-600"
            onClick={() => confirm(`Are you sure you want to permenantly delete "${feed.name}?"`)}
          />
        </Form>
      </div>
    </>
  );
};

export default FeedShow;
