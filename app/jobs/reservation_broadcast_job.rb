class ReservationBroadcastJob < ApplicationJob
  queue_as :reservations

  def perform(user_car_id)
    user_car = UserCar.find_by(id: user_car_id)
  
    if user_car
      CarReservationService.send_reservations
    else
      puts("message not found with id: #{message_id}")
    end
  end

end
