class FeedFilter < ApplicationRecord
  belongs_to :feed
  after_initialize :init

  validates :url, presence: true
  validates :pronoun, presence: true
  validates :feed_id, presence: true

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
end
