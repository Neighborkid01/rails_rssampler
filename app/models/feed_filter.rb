class FeedFilter < ApplicationRecord
  belongs_to :feed
  after_initialize :init

  validates :url, presence: true
  validates :pronoun, presence: true
  validates :feed_id, presence: true
  validate :conditions_presence
  validate :substitutions_presence

  # Stupid activerecord already has a method named #all, so I can't name my enum correctly...
  enum pronoun: {
    any_: 0,
    all_: 1,
  }

  private

  def init
    self.url ||= ""
    self.pronoun ||= FeedFilter.pronouns.keys.first
    self.conditions ||= [FilterCondition.default_hash]
    self.substitutions ||= [FilterSubstitution.default_hash]
  end

  def conditions_presence
    errors.add(:conditions, "must have at least one entry") if conditions.blank?
    duplicate_conds = conditions.map { |condition| "#{condition["field"]} #{condition["filter_type"].downcase}" }
      .group_by { |cond| cond }
      .filter { |_, v| v.size > 1 }
      .keys
    duplicate_conds.each do |cond|
      errors.add(:conditions, "cannot have duplicate condition: #{cond}")
    end
    blank_errors = []
    conditions.each do |condition|
      blank_errors << "#{condition["field"]} #{condition["filter_type"].downcase} must have a value" if condition["value"].blank?
    end
    blank_errors.to_set.each do |error|
      errors.add(:conditions, error)
    end
  end

  def substitutions_presence
    duplicate_fields = substitutions.map { |substitution| substitution["field"] }
      .group_by { |field| field }
      .filter { |_, v| v.size > 1 }
      .keys
    duplicate_fields.each do |field|
      errors.add(:substitutions, "cannot have duplicate field: #{field}")
    end
    blank_errors = []
    substitutions.each do |substitution|
      blank_errors << "#{substitution["field"]} must have a value" if substitution["value"].blank?
    end
    blank_errors.to_set.each do |error|
      errors.add(:substitutions, error)
    end
  end
end
