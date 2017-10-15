class CarsController < ApplicationController
  
  def index;end

  def new
    @car = Car.new
  end
  
  def create
    @car = Car.new(car_params)
    
    if @car.save
      flash[:notice] = "Car successfully created!"
      redirect_to root_path
    else
      render :new
    end
  end
  
  private
  
    def car_params
      params.require(:car).permit(:make, :fuel, :transmission, :color)
    end
  
end
