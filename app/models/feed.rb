class Feed < ApplicationRecord
  has_many :feed_filters
  after_initialize :init

  def init
    self.name ||= ""
  end
end
