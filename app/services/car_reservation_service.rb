class CarReservationService
  
  include Virtus.model
  attribute :user_id, Integer
  attribute :car_id, Integer
  attribute :taken_at, DateTime
  attribute :taken_till, DateTime
  attribute :user_car, UserCar, default: :set_user_car
  attribute :errors, Array, default: :check_for_errors
  
  def reserve! 
    user_car.save if errors.blank?
  end
  
  private
  
    def check_for_errors
      user_car.valid?
      user_car.errors.add :base, "This car already is booked for these dates" if car_already_booked? 
      user_car.errors.add :base, "You have already booked a car for these dates" if user_has_car_for_dates? 
      user_car.errors
    end
  
    def car_already_booked?
      UserCar.where(taken_at: reservation_dates, car_id: car_id)
             .or(UserCar.where(taken_till: reservation_dates, car_id: car_id))
             .exists?
    end
    
    def user_has_car_for_dates?
      UserCar.where(taken_at: reservation_dates, user_id: user_id)
             .or(UserCar.where(taken_till: reservation_dates, user_id: user_id))
             .exists?
    end
    
    def set_user_car
      UserCar.new(
        user_id: user_id,
        car_id: car_id,
        taken_at: taken_at,
        taken_till: taken_till
      )
    end
    
    def reservation_dates
      taken_at..taken_till
    end
end