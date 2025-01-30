class FilterSubstitution
  attr_reader :field, :value

  def initialize(field: FilterableField.default, value: "")
    @field = field
    @value = value
  end

  def to_h
    {
      field: @field,
      value: @value,
    }
  end

  def self.from_hash(hash)
    new(**hash.symbolize_keys)
  end

  def self.default_hash
    filter_sub = self.new
    filter_sub.to_h
  end
end
