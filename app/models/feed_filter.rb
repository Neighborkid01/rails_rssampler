class FeedFilter < ApplicationRecord
  belongs_to :feed
  after_initialize :init

  validates :url, presence: true
  validates :pronoun, presence: true

  # Stupid activerecord already has a method named #all, so I can't name my enum correctly...
  enum pronoun: {
    any_: 0,
    all_: 1,
  }

  private

  def init
    self.url ||= ""
    self.pronoun ||= FeedFilter.pronouns.keys.first
    self.conditions ||= [default_filter_condition]
    self.substitutions ||= [default_filter_substitution]
  end

  def default_filter_condition
    {
      filter_type: "Starts With",
      field: "Title",
      value: "",
    }
  end

  def default_filter_substitution
    {
      field: "Title",
      value: "",
    }
  end
end
