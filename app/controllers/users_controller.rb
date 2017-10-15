class UsersController < ApplicationController
  
  def index
    @users = User.all
  end
  
  def reservations
    @reservations = current_user.user_cars.includes(:car)
  end
  
end
