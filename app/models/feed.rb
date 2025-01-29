class Feed < ApplicationRecord
  has_many :feed_filters
  after_initialize :init

  private

  def init
    self.name ||= ""
  end
end
