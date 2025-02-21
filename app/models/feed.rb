class Feed < ApplicationRecord
  # this says has many but it only works with 1 for now
  belongs_to :user
  has_many :feed_filters, dependent: :destroy
  alias_method :filters, :feed_filters

  after_initialize :init
  before_save :ensure_feed_code

  validates :name, presence: true

  def ensure_feed_code
    self.feed_code ||= SecureRandom.urlsafe_base64(7) # 10-digit feed code
  end

  private

  def init
    self.name ||= ""
  end
end
