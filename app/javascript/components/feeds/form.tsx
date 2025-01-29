import React, { useState } from "react";
import { FeedForCreation } from "../../models/feed";
import { FeedFilterForCreation, FilterCondition, FilterSubstitution } from "../../models/feed_filter";
import FeedFiltersForm from "../feed_filters/form";
import Form from "../shared/form";

interface FeedContextParams {
  setConditions: React.Dispatch<React.SetStateAction<[number, FilterCondition][]>>;
  nextConditionId: number;
  setNextConditionId: React.Dispatch<React.SetStateAction<number>>;
  setSubstitutions: React.Dispatch<React.SetStateAction<[number, FilterSubstitution][]>>;
  nextSubstitutionId: number;
  setNextSubstitutionId: React.Dispatch<React.SetStateAction<number>>;
}

const FeedContext = React.createContext<FeedContextParams | null>(null);
const useFeedContext =  () => {
  const context = React.useContext(FeedContext);
  if (!context) {
    throw new Error("useFeedContext must be used within a FeedContext.Provider");
  }
  return context;
};

interface FeedFormProps {
  feed: FeedForCreation;
  filter: FeedFilterForCreation;
}

const FeedForm = ({ feed, filter }: FeedFormProps) => {
  const action = feed.id ? `/feeds/${feed.id}` : "/feeds";

  const [name, setName] = useState(feed.name);
  const [url, setUrl] = useState(filter.url);
  const pronoun = filter.pronoun;

  const conds = filter.conditions.map((cond, i): [number, FilterCondition] => [i, cond]);
  const [conditions, setConditions] = useState(conds);
  const [nextConditionId, setNextConditionId] = useState(conditions.length);

  const subs = filter.substitutions.map((sub, i): [number, FilterSubstitution] => [i, sub]);
  const [substitutions, setSubstitutions] = useState(subs);
  const [nextSubstitutionId, setNextSubstitutionId] = useState(substitutions.length);

  return (
    <Form action={action}>
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
            value={url} onChange={e => setUrl(e.target.value)}
          />
          {/* <FormError errors field=FeedFormField::Url /> */}
        </label>
      </div>

      <FeedContext.Provider value={{
        setConditions,
        nextConditionId,
        setNextConditionId,
        setSubstitutions,
        nextSubstitutionId,
        setNextSubstitutionId,
      } as FeedContextParams}
      >
        <FeedFiltersForm
          pronoun={pronoun}
          conditions={conditions}
          substitutions={substitutions}
          // errors={errors}
        />
      </FeedContext.Provider>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default FeedForm;
export {
  FeedContext,
  useFeedContext,
};
