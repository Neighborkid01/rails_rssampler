import React, { useState } from "react";
import { EditableFeed } from "../../models/feed";
import { FilterCondition, FilterPronoun, FilterSubstitution } from "../../models/feed_filter";
import FeedFiltersForm from "../feed_filters/form";

interface FeedFormProps {
  feed: EditableFeed;
  url: string;
  pronoun: FilterPronoun,
  conditions: FilterCondition[];
  substitutions: FilterSubstitution[];
}

const FeedForm = ({ feed, url, pronoun, conditions, substitutions }: FeedFormProps) => {
  const action = feed.id ? `/feeds/${feed.id}` : "/feeds";

  const [name, setName] = useState(feed.name);
  const [sourceUrl, setSourceUrl] = useState(url);

  const onSubmit = () => {

  };

  return (
    <form action={action} onSubmit={onSubmit} method="post">
      <div className="grid gap-6 mt-6 mb-2 md:grid-cols-2">
        {feed.id && <input type="hidden" name="feed[id]" value={feed.id}/>}
        {feed.feed_code && <input type="hidden" name="feed[feed_code]" value={feed.feed_code}/>}

        <label className="block text-md font-medium text-slate-100">
          Name
          <input type="text" name="feed[name]" placeholder="My Feed"
            className="text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
            value={name} onChange={e => setName(e.target.value)}
          />
          {/* <FormError errors field=FeedFormField::Name /> */}
        </label>

        <label className="block text-md font-medium text-slate-100">
          Source URL
          <input type="text" name="feed_filter[url]" placeholder="https://example.com/feed.xml"
            className="text-sm rounded-lg mt-2 block w-full p-2.5 border bg-slate-800 border-slate-600 placeholder-gray-400 text-slate-100 focus:ring-blue-500 focus:border-blue-500"
            value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
          />
          {/* <FormError errors field=FeedFormField::Url /> */}
        </label>
      </div>

      <FeedFiltersForm
        pronoun={pronoun}
        conditions={conditions}
        substitutions={substitutions}
        // errors={errors}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedForm;
