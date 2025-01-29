enum FilterableField {
  Author = "Author",
  Description = "Description",
  Duration = "Duration",
  EpisodeType = "Episode Type",
  Explicit = "Is Explicit",
  Image = "Image",
  Keywords = "Keywords",
  Language = "Language",
  LastBuildDate = "Last Build Date",
  Link = "Link",
  NewFeedUrl = "New Feed URL",
  PublishedDate = "Published Date",
  Subtitle = "Subtitle",
  Summary = "Summary",
  Title = "Title",
  Url = "URL",
}

function filterableFieldValue(value: FilterableField): string {
  const res =  Object.keys(FilterableField).find(key => FilterableField[key as keyof typeof FilterableField] === value);
  if (res === undefined) { throw new Error(`This code should never run, how did you get here with ${value}?`); }
  return res;
}

export {
  FilterableField,
  filterableFieldValue,
};
