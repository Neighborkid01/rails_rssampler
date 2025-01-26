class FeedFilter < ApplicationRecord
  belongs_to :feed

  validates :url, presence: true
  validates :pronoun, presence: true

  # Stupid activerecord already has a method named #all, so I can't name my enum correctly...
  enum pronoun: {
    any_: 0,
    all_: 1,
  }
end
