import React, { useEffect, useState } from "react";
import { FeedForCreation } from "../../models/feed";
import { FeedFilterForCreation, FeedFilterForPreview, FilterCondition, FilterPronoun, FilterSubstitution } from "../../models/feed_filter";
import FeedFiltersForm from "../feed_filters/form";
import Form from "../shared/form";
import Header from "../shared/header";
import { useRailsContext } from "../shared/rails_component";
import Input from "../shared/form_fields/input";
import HiddenInput from "../shared/form_fields/hidden_input";
import FeedPreview from "../feed_filters/preview";

interface FeedContextParams {
  setPronoun: React.Dispatch<React.SetStateAction<FilterPronoun>>;
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
  filters: FeedFilterForCreation[];
}

const FeedForm = ({ feed, filters }: FeedFormProps) => {
  const railsContext = useRailsContext();

  const title = feed.id ? "Edit Feed" : "New Feed";
  const action = feed.id ? `/feeds/${feed.feed_code}` : "/feeds";
  const method = feed.id ? "PUT" : "POST";
  const redirectTo = action;

  const filter = filters[0]; // This is super jank and needs to be changed

  // Keeping track of these here too bc I need to build a feed and filters for the preview
  const [url, setUrl] = useState(filter.url);
  const [pronoun, setPronoun] = useState(filter.pronoun);

  const conds = filter.conditions.map((cond, i): [number, FilterCondition] => [i, cond]);
  const [conditions, setConditions] = useState(conds);
  const [nextConditionId, setNextConditionId] = useState(conditions.length);

  const subs = filter.substitutions.map((sub, i): [number, FilterSubstitution] => [i, sub]);
  const [substitutions, setSubstitutions] = useState(subs);
  const [nextSubstitutionId, setNextSubstitutionId] = useState(substitutions.length);

  const [previewFilter, setPreviewFilter] = useState(null as FeedFilterForPreview | null);

  useEffect(() => {
    setPreviewFilter({
      url,
      pronoun,
      conditions: JSON.stringify(conditions.map(([_, cond]) => cond)),
      substitutions: JSON.stringify(substitutions.map(([_, sub]) => sub)),
    } as FeedFilterForPreview);
  }, [url, pronoun, conditions, substitutions]);

  return (
    <>
      <Header>{title}</Header>
      <Form action={action} method={method} redirectTo={redirectTo}>
        <HiddenInput field="feed[user_id]" value={railsContext.current_user!.id} />
        <div className="grid gap-6 mt-6 mb-2 md:grid-cols-2">
          {feed.id && <HiddenInput field="feed[id]" value={feed.id!} />}
          {feed.feed_code && <HiddenInput field="feed[feed_code]" value={feed.feed_code} />}
          {filter.id && <HiddenInput field="feed_filter[id]" value={filter.id} />}

          <Input field="feed[name]" type="text" label="Name" initialValue={feed.name} placeholder="My Feed" />
          <Input
            field="feed_filter[url]"
            type="url"
            label="Source URL"
            initialValue={filter.url}
            onValueChange={(url) => setUrl(url)}
            placeholder="https://example.com/feed.xml"
          />
        </div>

        <FeedContext.Provider
          value={{
            setPronoun,
            setConditions,
            nextConditionId,
            setNextConditionId,
            setSubstitutions,
            nextSubstitutionId,
            setNextSubstitutionId,
          } as FeedContextParams}
        >
          <FeedFiltersForm
            pronoun={filter.pronoun}
            conditions={conditions}
            substitutions={substitutions}
          />
        </FeedContext.Provider>

        {previewFilter && <FeedPreview filter={previewFilter} />}

        <div className="flex justify-end mt-6">
          <a href={`/feeds${feed.feed_code ? `/${feed.feed_code}` : ""}`} className="px-4 py-2 hover:underline">{`Back to ${feed.feed_code ? feed.name : "my feeds"}`}</a>
          <button className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">Submit</button>
        </div>
      </Form>
    </>
  );
};

export default FeedForm;
export {
  FeedContext,
  useFeedContext,
};
