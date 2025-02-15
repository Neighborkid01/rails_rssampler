require "open-uri"

class FeedFilterParsingService
  def initialize(feed)
    @feed = feed
  end

  def parse
    # Only works for 1 filter for now
    @filter = @feed.feed_filters.first
    if @filter.blank?
      Rails.logger.error "No filters found for feed #{@feed.feed_code}"
      return
    end

    conditions = @filter.conditions.map { |cond| FilterCondition.from_hash(cond) }
    doc = Nokogiri::XML(URI.open(@filter.url))

    start_time = Time.now

    doc.xpath("//rss/channel/item").each do |item|
      item.remove if should_be_removed?(item, conditions)
    end

    end_time = Time.now
    Rails.logger.info "Parsing took #{end_time - start_time} seconds"

    doc.to_xml
  end

  private

  def should_be_removed?(node, conditions)
    satisfied_conditions = []

    node.element_children.each do |child|
      break if @filter.pronoun == "any_" && satisfied_conditions.present?
      satisfied_conditions += check_filter_conditions(conditions, child)
    end

    unsatisfied_conditions = conditions.filter { |cond| satisfied_conditions.exclude? cond }
    if (
      (@filter.pronoun == "any_" && satisfied_conditions.present?) ||
      (@filter.pronoun == "all_" && unsatisfied_conditions.empty?)
    )
      Rails.logger.debug "- #{node.at_css("title").text || "No title found for item"}"
      return false
    end

    true
  end

  def check_filter_conditions(conditions, node)
    satisfied_conditions = []
    conditions.each do |condition|
      break if @filter.pronoun == "any_" && !satisfied_conditions.empty?
      next if node.name != FilterableField.as_tag_title(condition.field)
      case condition.filter_type
      when FilterType::STARTS_WITH
        next unless node.text.start_with? condition.value
      when FilterType::ENDS_WITH
        next unless node.text.end_with? condition.value
      when FilterType::CONTAINS
        next unless node.text.include? condition.value
      when FilterType::MATCHES
        regex = Regexp.new(condition.value)
        next unless node.text =~ regex
      end
      satisfied_conditions << condition
    end
    satisfied_conditions
  end
end
