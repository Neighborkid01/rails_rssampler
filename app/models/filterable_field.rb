class FilterableField
  AUTHOR = "Author"
  DESCRIPTION = "Description"
  DURATION = "Duration"
  EPISODE_TYPE = "Episode Type"
  EXPLICIT = "Is Explicit"
  IMAGE = "Image"
  KEYWORDS = "Keywords"
  LANGUAGE = "Language"
  LAST_BUILD_DATE = "Last Build Date"
  LINK = "Link"
  NEW_FEED_URL = "New Feed URL"
  PUBLISHED_DATE = "Published Date"
  SUBTITLE = "Subtitle"
  SUMMARY = "Summary"
  TITLE = "Title"
  URL = "URL"

  def self.default
    TITLE
  end

  def self.as_tag_title(field, namespace = "")
    titles = {
      AUTHOR => "author",
      DESCRIPTION => "description",
      DURATION => "duration",
      EPISODE_TYPE => "episodeType",
      EXPLICIT => "explicit",
      IMAGE => "image",
      KEYWORDS => "keywords",
      LANGUAGE => "language",
      LAST_BUILD_DATE => "lastBuildDate",
      LINK => "link",
      NEW_FEED_URL => "new-feed-url",
      PUBLISHED_DATE => "pubDate",
      SUBTITLE => "subtitle",
      SUMMARY => "summary",
      TITLE => "title",
      URL => "url",
    }
    title = titles[field]
    if title.blank?
      Rails.logger.error "No title exists for field '#{field}'"
      return
    end

    namespace.present? ? "#{namespace}:#{title}" : title
  end
end
