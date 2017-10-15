class CarReservationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "car_reservations_channel"
  end

  def unsubscribed
    stop_all_streams
  end

  def reserve_car(data)
    Chronic.time_class = Time.zone
    
    car_reservation_service = CarReservationService.new(
      taken_at: Chronic.parse(data["taken_at"]),
      taken_till: Chronic.parse(data["taken_till"]),
      user_id: current_user.id,
      car_id: data["car_id"]
    )
    
    if car_reservation_service.reserve!
      ReservationBroadcastJob.new(car_reservation_service.user_car.id).perform_now
    else
      transmit({type: 'errors', data: car_reservation_service.errors.full_messages})
    end
  end
end