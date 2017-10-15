class ReservationsController < ApplicationController
  
  def index
    @reservations = current_user.user_cars.active_reservations.includes(:car)
  end
  
  def destroy
    rezervation = UserCar.find(params[:id])
    
    if rezervation.destroy
      CarReservationService.send_reservations
      redirect_to reservations_path
    end
  end
  
end
