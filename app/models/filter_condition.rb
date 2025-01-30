class FilterCondition
  attr_reader :filter_type, :field, :value

  def initialize(
    filter_type: FilterType.default,
    field: FilterableField.default,
    value: ""
  )
    @filter_type = filter_type
    @field = field
    @value = value
  end

  def to_h
    {
      filter_type: @filter_type,
      field: @field,
      value: @value,
    }
  end

  def self.from_hash(hash)
    new(**hash.symbolize_keys)
  end

  def self.default_hash
    filter_cond = self.new
    filter_cond.to_h
  end
end
