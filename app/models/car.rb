class Car < ApplicationRecord
  
  has_many :user_cars, dependent: :destroy
  
  enum fuel: [:petrol, :diesel, :hybrid, :electric]
  enum transmission: [:manual, :automatic, :semi_automatic]
  
  validates :make, :fuel, :transmission, presence: true
  
  default_scope { order(created_at: :desc) }
  
  # scope :available_week_from_now, -> { joins(:user_cars).where(user_cars: { taken_at: (Date.today..Date.today + 7.days) }) }
  scope :taken, -> { joins(:user_cars).where(:user_cars, {current: true}) }
end
