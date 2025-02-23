class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable

  has_many :feeds, dependent: :destroy
  has_many :feed_filters, through: :feeds

  def admin?
    self.is_admin
  end
end
