class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  validates :first_name, :last_name, presence: true
  
  has_many :user_cars
  has_many :cars, through: :user_cars
  
  # scope :current_car, -> { joins(:user_cars).where(:user_cars {taken_at: taken_at, taken_till: taken_till}) }
  
end
