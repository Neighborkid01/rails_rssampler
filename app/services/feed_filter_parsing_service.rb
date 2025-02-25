require "open-uri"

class InvalidRssUrlError < StandardError; end

class FeedFilterParsingService
  attr_reader :title, :removed_items, :retained_items

  def initialize(filters)
    @filters = filters
    @title = nil
    @removed_items = []
    @retained_items = []
  end

  def parse(generate_preview: false)
    if @filters.blank?
      Rails.logger.error "No filters were passed: '#{@filters}'"
      return
    end

    # Only works for 1 filter for now
    @filter = @filters.first

    validator = RssUrlValidator.new(@filter.url)
    begin
      unless validator.valid?
        Rails.logger.error "Invalid RSS URL: #{@filter.url}"
        raise InvalidRssUrlError, "The provided URL is invalid"
      end
    rescue RedirectError => e
      raise InvalidRssUrlError, e.message
    end

    conditions = @filter.conditions.map { |cond| FilterCondition.from_hash(cond) }
    field_titles = conditions.map { |cond| FilterableField.as_tag_title(cond.field) }
    doc = Nokogiri::XML(URI.open(@filter.url))
    @title = doc.at_css("title")&.text

    start_time = Time.now

    doc.xpath("//rss/channel/item").each do |item|
      removed = false
      if should_be_removed?(item, conditions)
        removed = true
        item.remove
      end
      if generate_preview
        values = get_filter_values(item, field_titles)
        removed ? @removed_items << values : @retained_items << values
      end
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
      satisfied_conditions += check_filter_conditions(child, conditions)
    end

    unsatisfied_conditions = conditions.filter { |cond| satisfied_conditions.exclude? cond }
    if (
      (@filter.pronoun == "any_" && satisfied_conditions.present?) ||
      (@filter.pronoun == "all_" && unsatisfied_conditions.empty?) ||
      (@filter.pronoun == "none_" && satisfied_conditions.empty?)
    )
      return false
    end

    true
  end

  def check_filter_conditions(node, conditions)
    satisfied_conditions = []

    # This would be more efficient if I just selected only the nodes I need to check and check them directly
    # that would be O(n)
    # this is currently O(m*n)
    # m = # of nodes and n = # of filters

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

  def get_filter_values(node, field_titles)
    condition_values = {}

    title_node = node.at_xpath(".//title")
    title = title_node&.text

    node.element_children.each do |child|
      next if child.name == "title"
      name = FilterableField.from_tag_title(child.name)
      condition_values[name] = child.text if field_titles.include? child.name
      break if condition_values.keys.count == field_titles.count
    end

    # Always include title in the result
    { "title" => title, "additional_fields" => condition_values }
  end
end
