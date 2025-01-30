class FilterType
  STARTS_WITH = "Starts with"
  ENDS_WITH = "Ends with"
  CONTAINS = "Contains"
  MATCHES = "Matches"

  def self.default
    self::STARTS_WITH
  end
end
