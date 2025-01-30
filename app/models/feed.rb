class Feed < ApplicationRecord
  # this says has many but it only works with 1 for now
  has_many :feed_filters, dependent: :destroy
  after_initialize :init
  before_save :ensure_feed_code

  def ensure_feed_code
    self.feed_code ||= SecureRandom.urlsafe_base64(7) # 10-digit feed code
  end

  private

  def init
    self.name ||= ""
  end
end
