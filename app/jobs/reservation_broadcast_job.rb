class ReservationBroadcastJob < ApplicationJob
  queue_as :reservations

  def perform(user_car_id)
    user_car = UserCar.find_by(id: user_car_id)
    
    if user_car
      serialized_reservation = UserCarsSerializer.new(user_car).as_json
      ActionCable.server.broadcast("car_reservations_channel", {type: 'new_reservation', data: serialized_reservation})
    else
      puts("message not found with id: #{message_id}")
    end
  end

end
