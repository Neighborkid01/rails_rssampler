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

function filterableFieldValue(value: string): string | undefined {
  return Object.keys(FilterableField).find(key => FilterableField[key as keyof typeof FilterableField] === value);
}

export {
  FilterableField,
  filterableFieldValue,
};
