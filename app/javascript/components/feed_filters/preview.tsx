import React, { useMemo, useState } from "react";
import Header from "../shared/header";
import { FeedFilterForPreview } from "../../models/feed_filter";
import { useRailsContext } from "../shared/rails_component";

type PreviewItem = {
  title: string;
  additional_fields: {
    [key: string]: string;
  }
};

type PreviewData = {
  title: string;
  removed_items: PreviewItem[];
  retained_items: PreviewItem[];
};

interface FeedPreviewProps {
  filter: FeedFilterForPreview;
  className?: string;
};

const FeedPreview = ({ filter, className }: FeedPreviewProps) => {
  const railsContext = useRailsContext();
  const [loading, setLoading] = useState(true);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useMemo(async () => {
    try {
      const jsonBody = { feed_filter: filter };
      setLoading(true);

      const response = await fetch("/feeds/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": railsContext.csrf_token,
        },
        body: JSON.stringify(jsonBody),
      });

      if (!response.ok) {
        const result = await response.json();
        console.warn(`Error getting preview via ajax: ${response.status} - ${response.statusText}`, result);
        setPreviewData(null);
        setLoading(false);
        setError(result.error);
        return;
      }

      const result = await response.json();
      setLoading(false);
      if (!result || !result["removed_items"] || !result["retained_items"]) {
        console.error("Unexpected value in result", result);
        return;
      }

      setPreviewData(result);
      setError(null);
    } catch (error) {
      setLoading(false);
      setPreviewData(null);
      console.error("Error getting preview via ajax", error);
    }
  }, [filter]);

  return (
    <div className={`border rounded-xl p-4 mt-4 mb-2 ${className}`}>
      {loading
        ? <Header>Loading...</Header>
        : (!previewData || error
          ? <Header>{`Error generating preview${error ? `: ${error}` : ""}`}</Header>
          : <>
            <Header>{`Preview: ${previewData.title}`}</Header>
            <div className="flex flex-col md:flex-row space-between">
              <div className="w-full">
                Kept:
                <PreviewItemList items={previewData.retained_items} className="text-green-400" showAll={showAll} />
              </div>
              <div className="w-full mt-4 md:mt-0">
                Removed:
                <PreviewItemList items={previewData.removed_items} className="text-red-500" showAll={showAll} />
              </div>
            </div>
            {(previewData.retained_items.length > 10 || previewData.removed_items.length > 10) && (
              <button
                className="mt-2 hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            )}
          </>
          )
      }
    </div>
  );
};

interface PreviewItemListProps {
  items: PreviewItem[];
  showAll: boolean;
  className?: string;
}

const PreviewItemList = ({ items, showAll, className }: PreviewItemListProps) => {
  const displayedItems = showAll ? items : items.slice(0, 10);

  return (
    <ol className={`list-decimal pl-8 ${className}`}>
      {displayedItems.map((item) => (
        <li key={item.title} className="">
          <div key="title">{item["title"]}</div>
          {item.additional_fields && Object.keys(item.additional_fields).length > 0 &&
            <ul className="list-disc pl-4">
              {Object.entries(item.additional_fields).map(([field, value]) =>
                <li key={field}>{`${field}: ${value}`}</li>
              )}
            </ul>
          }
        </li>
      ))}
      {!showAll && items.length > 10 &&
        <li className="text-slate-100 list-none">{`${items.length - displayedItems.length} more...`}</li>
      }
    </ol>
  );
};

export default FeedPreview;
