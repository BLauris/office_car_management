class Api::CarsController < ApplicationController

  def index
    cars = Car.all
    render json: cars, status: 200
  end
  
  def all_reservations
    user_cars = UserCar.active_reservations
    render json: user_cars, each_serializer: UserCarsSerializer
  end
  
  def reservation_details
    user_cars = UserCar.active_reservations
                       .where(car_id: params[:car_id])
                       .includes(:user)
                       
    render json: user_cars, each_serializer: UserCarsSerializer
  end
end
