class Feed < ApplicationRecord
  # this says has many but there's only 1 right now
  has_many :feed_filters, dependent: :destroy
  after_initialize :init

  private

  def init
    self.name ||= ""
  end
end
