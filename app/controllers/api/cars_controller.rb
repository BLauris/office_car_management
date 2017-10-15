class Api::CarsController < ApplicationController

  def index
    cars = Car.all
    render json: cars, status: 200
  end
  
  def reservation_details
    
    user_cars = UserCar.where('taken_at >= ?', DateTime.now)
                       .where(car_id: params[:car_id])
                       .includes(:user)
                       
    #  UserCarsSerializer.new(user_cars.first).to_json
    render json: user_cars, each_serializer: UserCarsSerializer
  end
end
